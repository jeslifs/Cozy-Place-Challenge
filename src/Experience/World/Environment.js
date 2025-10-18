import * as THREE from 'three'
import Experience from '../Experience'
import Bushs from './Bushs'


export default class Environment
{
    constructor(placeholder)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        // Parameters
        this.ambientLightParameters = {
            color: '#B6F9FF',
            // color:0x000fe6,
            intensity: 0.375,
        }

        this.directionalLight1Parameters = {
            color: '#6F85FF',
            intensity: 1.216,
        }

        this.directionalLight2Parameters = {
            color: '#FF9CB1',
            intensity: 0.156,
        }

        // bush setup
        this.bush = new Bushs(
            placeholder,
            this.ambientLightParameters,
            this.directionalLight1Parameters,
            this.directionalLight2Parameters
        )        

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Environment')
            this.debugFolder.close()
        }

        // this.setSunlight()
        this.setAmbientLight()
        this.setDirectionalLights()
        // this.setHemisphereLight()
        this.setEnvironmentMap()
    }

    setHemisphereLight()
    {
        this.hemisphereLight = new THREE.HemisphereLight(this.directionalLight1Parameters.color, this.directionalLight2Parameters.color, 0.5)
        this.scene.add(this.hemisphereLight)

        if(this.debug.active)
        {
            this.hemisphereLightHelper = new THREE.HemisphereLightHelper(this.hemisphereLight, 1); // The '1' is the size of the helper
            
            this.scene.add(this.hemisphereLightHelper);

            const hemisphereFolder = this.debugFolder.addFolder('Hemisphere Light')
            hemisphereFolder.add(this.hemisphereLight, 'intensity').min(0).max(2).step(0.001).name('intensity')
            hemisphereFolder.addColor(this.hemisphereLight, 'color').name('skyColor')
            hemisphereFolder.addColor(this.hemisphereLight, 'groundColor').name('groundColor')
        }
    }

    setSunlight()
    {
        this.sunlight = new THREE.DirectionalLight(0xffffff, 4)
        this.sunlight.castShadow = true
        this.sunlight.shadow.camera.far = 15
        this.sunlight.shadow.mapSize.set(1024, 1024)
        this.sunlight.shadow.normalBias = 0.05
        this.sunlight.position.set(3.5, 2, -1.25)
        this.scene.add(this.sunlight)

        // Debug
        if(this.debug.active)
        {
            this.debugFolder.add(this.sunlight, 'intensity').min(0).max(10).step(0.001).name('sunlightIntensity')
            this.debugFolder.add(this.sunlight.position, 'x').min(-5).max(5).step(0.001).name('sunlightX')
            this.debugFolder.add(this.sunlight.position, 'y').min(-5).max(5).step(0.001).name('sunlightY')
            this.debugFolder.add(this.sunlight.position, 'z').min(-5).max(5).step(0.001).name('sunlightZ')
        }
    }

    setEnvironmentMap()
    {
        this.environmentMap = {}
        this.environmentMap.intensity = 0.46
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        // console.log(this.environmentMap.texture);
        
        this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace

        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterials = () =>
        {
            this.scene.traverse((child) =>
            {
                // console.log(child.material)
                
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }

        this.environmentMap.updateMaterials()

        // Debug
        // if(this.debug.active)
        // {
        //     this.debugFolder.add(this.environmentMap, 'intensity').min(0).max(4).step(0.001).onChange(this.environmentMap.updateMaterials)
        // }
    }

    setAmbientLight()
    {
        this.ambientLight = new THREE.AmbientLight(this.ambientLightParameters.color, this.ambientLightParameters.intensity)
        this.scene.add(this.ambientLight)

        // Debug
        if(this.debug.active)
        {
            this.ambientFolder = this.debugFolder.addFolder('Ambient Light')
            this.ambientFolder.addColor(this.ambientLightParameters, 'color').onChange(() => {
                this.ambientLight.color.set(this.ambientLightParameters.color)
                this.bush.material.uniforms.uAmbientLight.value.set(this.ambientLightParameters.color)
            })
            this.ambientFolder.add(this.ambientLightParameters, 'intensity').min(0).max(4).step(0.001).name('ambientLightIntensity').onChange(() => {
                this.ambientLight.intensity = this.ambientLightParameters.intensity
                this.bush.material.uniforms.uAmbientLightIntensity.value = (this.ambientLightParameters.intensity)

            })
            this.ambientFolder.close()
        }
    }

    setDirectionalLights()
    {
        this.directionalLight1 = new THREE.DirectionalLight(this.directionalLight1Parameters.color, this.directionalLight1Parameters.intensity)
        this.directionalLight1.position.set(5, 3.93, -5)
        // this.directionalLight1.rotation.set(-0.1295, 1.507, 0)
        // this.directionalLight1.target.position.set(0.276, 1.711, -5)
        // this.directionalLight1.target.position.set(0.276, 1.711, -5)
        this.directionalLight1.castShadow = true

        // shadow camera
        this.directionalLight1.shadow.camera.near = 1.6
        this.directionalLight1.shadow.camera.far = 13.3
        this.directionalLight1.shadow.camera.top = 5
        this.directionalLight1.shadow.camera.bottom = -3.1
        this.directionalLight1.shadow.camera.left = -5.5
        this.directionalLight1.shadow.camera.right = 5.2

        this.directionalLight2 = new THREE.DirectionalLight(this.directionalLight2Parameters.color, this.directionalLight2Parameters.intensity)
        this.directionalLight2.position.set(-5, 1.972, -3.77)
        this.directionalLight2.rotation.set(0.2764, -0.3685, 0.9624)
        this.directionalLight2.target.position.set(-4.553, 1.32, 0.276)

        this.scene.add(
            this.directionalLight1,
            this.directionalLight2,   
        )

        // Debug
        if(this.debug.active)
        {
            const updateLight1Dir = () => {
                this.bush.material.uniforms.uDirectionalLigt1Position.value.copy(this.directionalLight1.position).normalize()
            }

            const updateLight2Dir = () => {
                this.bush.material.uniforms.uDirectionalLigt2Position.value.copy(this.directionalLight2.position).normalize()
            }

            const updateShadowCamera = () => {
                this.directionalLight1.shadow.camera.updateProjectionMatrix()
                this.directionalLight1CameraHelper.update()
            }

            // Helpers
            this.directionalLight1Helper = new THREE.DirectionalLightHelper(this.directionalLight1, 0.5, 0x0000ff)
            this.directionalLight2Helper = new THREE.DirectionalLightHelper(this.directionalLight2, 0.5, 0xff0000)
            this.directionalLight1CameraHelper = new THREE.CameraHelper(this.directionalLight1.shadow.camera)
            this.directionalLight1CameraHelper.visible = false

            this.scene.add(this.directionalLight1Helper, this.directionalLight2Helper, this.directionalLight1CameraHelper)
            

            this.directionalFolder = this.debugFolder.addFolder('Directional Lights')
            this.directionalFolder.close()

            this.directionalLight1Folder = this.directionalFolder.addFolder('Directional Light 1')
            this.directionalLight1Folder.close()

            this.directionalLight1Folder.add(this.directionalLight1, 'intensity').min(0).max(10).step(0.001).name('directionalLight1Intensity').onChange(()=> this.bush.material.uniforms.uDirectionalLigt1Intensity.value = this.directionalLight1.intensity)
            this.directionalLight1Folder.add(this.directionalLight1.position, 'x').min(-5).max(5).step(0.001).name('directionalLight1X').onChange(updateLight1Dir)
            this.directionalLight1Folder.add(this.directionalLight1.position, 'y').min(-5).max(5).step(0.001).name('directionalLight1Y').onChange(updateLight1Dir)
            this.directionalLight1Folder.add(this.directionalLight1.position, 'z').min(-5).max(5).step(0.001).name('directionalLight1Z').onChange(updateLight1Dir)
            this.directionalLight1Folder.addColor(this.directionalLight1, 'color').name('directionalLight1Color')
            this.directionalLight1Folder.add(this.directionalLight1Helper, 'visible').name('directionalLight1Helper')

            this.directionalShadowFolder = this.directionalLight1Folder.addFolder('Directional Light 1 Shadow Camera')
            this.directionalShadowFolder.close()

            this.directionalShadowFolder.add(this.directionalLight1.shadow.camera, 'near').min(0).max(20).step(0.1).name('near').onChange(updateShadowCamera)
            this.directionalShadowFolder.add(this.directionalLight1.shadow.camera, 'far').min(0).max(50).step(0.1).name('far').onChange(updateShadowCamera)
            this.directionalShadowFolder.add(this.directionalLight1.shadow.camera, 'left').min(-20).max(20).step(0.1).name('left').onChange(updateShadowCamera)
            this.directionalShadowFolder.add(this.directionalLight1.shadow.camera, 'right').min(-20).max(20).step(0.1).name('right').onChange(updateShadowCamera)
            this.directionalShadowFolder.add(this.directionalLight1.shadow.camera, 'top').min(-20).max(20).step(0.1).name('top').onChange(updateShadowCamera)
            this.directionalShadowFolder.add(this.directionalLight1.shadow.camera, 'bottom').min(-20).max(20).step(0.1).name('bottom').onChange(updateShadowCamera)
            this.directionalShadowFolder.add(this.directionalLight1CameraHelper, 'visible').name('Directional Light1 Shadow Camera')
            
            // this.directionalFolder.add(this.directionalLight1.rotation, 'x').min(- Math.PI).max(Math.PI).step(0.001).name('directionalLight1RotationX')
            // this.directionalFolder.add(this.directionalLight1.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('directionalLight1RotationY')
            // this.directionalFolder.add(this.directionalLight1.rotation, 'z').min(- Math.PI).max(Math.PI).step(0.001).name('directionalLight1RotationZ')

            this.directionalLight2Folder = this.directionalFolder.addFolder('Directional Light 2')
            this.directionalLight2Folder.close()
            
            this.directionalLight2Folder.add(this.directionalLight2, 'intensity').min(0).max(10).step(0.001).name('directionalLight2Intensity').onChange(()=> this.bush.material.uniforms.uDirectionalLigt2Intensity.value = this.directionalLight2.intensity)
            this.directionalLight2Folder.add(this.directionalLight2.position, 'x').min(-5).max(5).step(0.001).name('directionalLight2X').onChange(updateLight2Dir)
            this.directionalLight2Folder.add(this.directionalLight2.position, 'y').min(-5).max(5).step(0.001).name('directionalLight2Y').onChange(updateLight2Dir)
            this.directionalLight2Folder.add(this.directionalLight2.position, 'z').min(-5).max(5).step(0.001).name('directionalLight2Z').onChange(updateLight2Dir)
            // this.directionalFolder.add(this.directionalLight2.rotation, 'x').min(- Math.PI).max(Math.PI).step(0.001).name('directionalLight2RotationX')
            // this.directionalFolder.add(this.directionalLight2.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('directionalLight2RotationY')
            // this.directionalFolder.add(this.directionalLight2.rotation, 'z').min(- Math.PI).max(Math.PI).step(0.001).name('directionalLight2RotationZ')
            this.directionalLight2Folder.addColor(this.directionalLight2, 'color').name('directionalLight2Color')
            this.directionalLight2Folder.add(this.directionalLight2Helper, 'visible').name('directionalLight2Helper')
        }
    }

    update()
    {
        if(this.bush)
            this.bush.update()
    }

}