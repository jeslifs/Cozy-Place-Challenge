import * as THREE from 'three'
import Experience from '../Experience'
import Vertex from '../Shaders/Godray/vertex.glsl'
import Fragment from '../Shaders/Godray/fragment.glsl'

export default class Godray
{
    constructor()
    {
        // console.log('Godray')

        this.experience  = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Godray')
            this.debugFolder.close()
        }

        // Setup
        this.resource = this.resources.items.perlinTexture
        this.resource.wrapS = THREE.RepeatWrapping
        this.resource.wrapT = THREE.RepeatWrapping

        this.parameters = {
            radiusTop: 0.54,
            radiusBottom: 1.23,
            height: 9.22,
            radialSegments: 13,
            heightSegments: 1,
            color: 0x70e7ff,
        }

        this.setGeometry()
        this.setMaterial()
        this.setGodray()

    }

    setGeometry()
    {
        
        
        this.geometry = new THREE.CylinderGeometry(
            this.parameters.radiusTop,
            this.parameters.radiusBottom,
            this.parameters.height,
            this.parameters.radialSegments,
            this.parameters.heightSegments,
            true
        )

        if (this.godray) {
            this.godray.geometry.dispose()
            this.godray.geometry = this.geometry
        }
    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            // wireframe: true,
            uniforms: {
                uTexture: new THREE.Uniform(this.resource),
                uTime: new THREE.Uniform(0),
                uGodrayStrength: new THREE.Uniform(1.59),
                uGodraySpeed: new THREE.Uniform(0.05),
                uGodrayTreshold: new THREE.Uniform(3.798),
                uColor: new THREE.Uniform(new THREE.Color(this.parameters.color)),
            },
            vertexShader: Vertex,
            fragmentShader: Fragment,
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            depthWrite: false,
            depthTest: true
            
            
            
        })
    }

    setGodray()
    {
        this.godray = new THREE.Mesh(this.geometry, this.material)
        this.godray.position.y = 3.313
        this.godray.position.x = 2.084
        this.godray.position.z = -1.358
        this.godray.rotation.x = 2.817
        this.godray.rotation.y = -0.117
        this.godray.rotation.z = -2.66
        // this.godray.lookAt(0,-1,-9)
        this.scene.add(this.godray)

        if(this.debug.active)
        {
            this.debugFolder.add(this.parameters, 'radiusTop').min(0).max(4.9).step(0.01).name('radiusTop').onFinishChange(() => {this.setGeometry()})
            this.debugFolder.add(this.parameters, 'radiusBottom').min(0.1).max(5).step(0.01).name('radiusBottom').onFinishChange(() => {this.setGeometry()})
            this.debugFolder.add(this.parameters, 'height').min(0).max(10).step(0.01).name('height').onFinishChange(() => {this.setGeometry()})
            this.debugFolder.add(this.parameters, 'radialSegments').min(3).max(64).step(1).name('radialSegments').onFinishChange(() => {this.setGeometry()})
            this.debugFolder.add(this.godray.rotation, 'x').min(- Math.PI).max(Math.PI).step(0.001).name('rotationX')
            this.debugFolder.add(this.godray.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotationY')
            this.debugFolder.add(this.godray.rotation, 'z').min(- Math.PI).max(Math.PI).step(0.001).name('rotationZ')
            this.debugFolder.add(this.godray.position, 'x').min(-10).max(10).step(0.001).name('positionX')
            this.debugFolder.add(this.godray.position, 'y').min(-10).max(10).step(0.001).name('positionY')
            this.debugFolder.add(this.godray.position, 'z').min(-10).max(10).step(0.001).name('positionZ')
            this.debugFolder.add(this.material.uniforms.uGodrayStrength, 'value').min(0).max(60).step(0.001).name('godrayStrength')
            this.debugFolder.add(this.material.uniforms.uGodrayTreshold, 'value').min(0).max(60).step(0.001).name('godrayTreshold')
            this.debugFolder.add(this.material.uniforms.uGodraySpeed, 'value').min(0).max(1).step(0.001).name('godraySpeed')
            this.debugFolder.addColor(this.parameters, 'color').onChange(() => {this.material.uniforms.uColor.value.set(this.parameters.color)})

            // this.debugFolder.add(this.parameters, 'widthSegments').min(3).max(64).step(1).name('widthSegments').onFinishChange(() => {this.setGeometry()})
            // this.debugFolder.add(this.parameters, 'heightSegments').min(3).max(64).step(1).name('heightSegments').onFinishChange(() => {this.setGeometry()})
            // this.debugFolder.add(this.material.uniforms.uTexture.value, 'repeat').min(1).max(10).step(1).name('textureRepeat')
        }
    }


    update()
    {
        this.material.uniforms.uTime.value = this.time.elapsed * 0.001
    }
}