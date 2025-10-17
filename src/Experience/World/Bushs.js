import * as THREE from 'three'
import Experience from '../Experience'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import Vertex from '../Shaders/Bushes/Vertex.glsl'
import Fragment from '../Shaders/Bushes/fragment.glsl'

export default class Bushs
{
    constructor(placeholder, ambientLightParameters, directionalLight1Parameters, directionalLight2Parameters)
    {
        this.experience  = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.resources = this.experience.resources

        this.placeholder = placeholder
        this.ambientLightParameters = ambientLightParameters
        this.directionalLight1Parameters = directionalLight1Parameters
        this.directionalLight2Parameters = directionalLight2Parameters
        // console.log(this.placeholder)
        
        this.debug = this.experience.debug
        

        // Resource
        this.resource = {}
        this.resource.bushAlpha = this.resources.items.bushTextureAlpha
        this.resource.bushAlpha.colorSpace = THREE.SRGBColorSpace
        // this.resource.bushAlpha.flipY = false

        this.resource.bushMatcap = this.resources.items.bushTextureMatcap
        // this.resource.bushMatcap.colorSpace = THREE.SRGBColorSpace
        this.resource.perlinTexture = this.resources.items.perlinTexture
        this.resource.perlinTexture.wrapS = THREE.RepeatWrapping
        this.resource.perlinTexture.wrapT = THREE.RepeatWrapping

        // this.resource.envMap = this.resources.items.environmentMapTexture

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Bushs')
            this.debugFolder.close()
        }

        // Uniforms
        this.uniform = {
            // uColor: { value: new THREE.Color('green') },
            uMatcap: new THREE.Uniform(this.resource.bushMatcap),
            uAlphaMap: new THREE.Uniform(this.resource.bushAlpha),
            uAmbientLight: new THREE.Uniform(new THREE.Color(this.ambientLightParameters.color)),
            uAmbientLightIntensity: new THREE.Uniform(this.ambientLightParameters.intensity),
            uDirectionalLigt1: new THREE.Uniform(new THREE.Color(this.directionalLight1Parameters.color)),
            uDirectionalLigt1Intensity: new THREE.Uniform(this.directionalLight1Parameters.intensity),
            uDirectionalLigt1Position: new THREE.Uniform(new THREE.Vector3(5, 3.93, -5)),
            uDirectionalLigt2: new THREE.Uniform(new THREE.Color(this.directionalLight2Parameters.color)),
            uDirectionalLigt2Intensity: new THREE.Uniform(this.directionalLight2Parameters.intensity),
            uDirectionalLigt2Position: new THREE.Uniform(new THREE.Vector3(-5, 1.972, -3.77)),
            uTime: new THREE.Uniform(0),
            uPerlinTexture: new THREE.Uniform(this.resource.perlinTexture),
            uWindStrength: new THREE.Uniform(0.3167),
            uWindSpeed: new THREE.Uniform(0.132),

        }

        this.setBushGeometry()
        this.setBushMaterial()
        this.setDepthMaterial()
        // this.setBushes()
        this.setInstancesBushes()


    }

    setInstancesBushes()
    {
        this.bushes = new THREE.InstancedMesh(
            this.geometry,
            this.material,
            this.placeholder.length
        )
        this.bushes.customDepthMaterial = this.depthMaterial
        this.bushes.castShadow = true
        this.scene.add(this.bushes)

        // calculate matrices
        const dummy = new THREE.Object3D()
        for(let i = 0; i < this.placeholder.length; i++)
        {
            const placeholder = this.placeholder[i]

            // copy position
            dummy.position.copy(placeholder.position)
            dummy.scale.copy(placeholder.scale)
            dummy.quaternion.copy(placeholder.quaternion)
            dummy.scale.multiplyScalar(0.3)

            dummy.updateMatrix()
            this.bushes.setMatrixAt(i, dummy.matrix)
            // this.bushes.setColorAt(i, new THREE.Color(Math.random() * 0xffffff));
        }

        this.bushes.instanceMatrix.needsUpdate = true
        this.bushes.computeBoundingBox()

        if(this.debug.active)
        {
            this.debugFolder.add(this.material.uniforms.uWindStrength, 'value').min(0).max(5).step(0.001).name('uWindStrength')
            this.debugFolder.add(this.material.uniforms.uWindSpeed, 'value').min(0).max(5).step(0.001).name('uWindSpeed')
        }

    }

    setBushes()
    {
        this.bushes = new THREE.Mesh(
            this.geometry,
            this.material
        )
        this.bushes.position.set(this.placeholder[0].position.x, 1, this.placeholder[0].position.z)
        this.bushes.scale.set(0.5, 0.5, 0.5)
        this.bushes.customDepthMaterial = this.depthMaterial
        this.bushes.castShadow = true
        this.scene.add(this.bushes)

    }

    setBushGeometry()
    {
        const count = 80
        const planes = []

        for(let i = 0; i < count; i++)
        {
            const plane = new THREE.PlaneGeometry(1, 1)
            planes.push(plane)


            // position
            const spherical = new THREE.Spherical(
                1 - Math.pow(Math.random(), 3),
                Math.PI * 2 * Math.random(),
                Math.PI * Math.random()
            )

            const position = new THREE.Vector3().setFromSpherical(spherical)
            plane.rotateX(Math.random() * 9999)
            plane.rotateY(Math.random() * 9999)
            plane.rotateZ(Math.random() * 9999)
            plane.translate(position.x, position.y, position.z)

        }

        this.geometry = mergeGeometries(planes)
    }

    setDepthMaterial()
    {
        this.depthMaterial = new CustomShaderMaterial({

            //CSM
            baseMaterial: THREE.MeshDepthMaterial,
            vertexShader: Vertex,
            uniforms: this.uniform,
            depthPacking: THREE.RGBADepthPacking

        })
    }

    setBushMaterial()
    {
        // this.material = new THREE.ShaderMaterial({
        this.material = new CustomShaderMaterial({
            //CSM
            baseMaterial: THREE.MeshStandardMaterial,
            vertexShader: Vertex,
            fragmentShader: Fragment,
            // alphaMap: this.resource.bushAlpha,
            uniforms: this.uniform,
            transparent: true,
            // alphaHash: true,
            // alphaTest: true,
            // colorWrite: true,
            side: THREE.DoubleSide,
            // opacity:1,
            // dithering: true,
            // depthWrite: false,
            // forceSinglePass: true,
            // toneMapped: false,

            // depthTest: true,
            // color: '#85d534'


        })
        
    }

    update()
    {
        // console.log('time')
        this.uniform.uTime.value = this.time.elapsed * 0.001
        
    }
}
