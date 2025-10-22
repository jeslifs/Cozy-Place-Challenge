import * as THREE from 'three'
import Experience from '../Experience'
import Vertex from '../Shaders/Fire/vertex.glsl'
import Fragment from '../Shaders/Fire/fragment.glsl'

export default class fire
{
    constructor(placeholder)
    {
        this.experience  = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.resources = this.experience.resources
        this.perlinTexture = this.resources.items.perlinTexture
        this.perlinTexture.wrapS = THREE.RepeatWrapping
        this.perlinTexture.wrapT = THREE.RepeatWrapping

        this.fireParameters = {
            bottom: '',
            top: ''
        }

        this.uniform = {
            uTime: new THREE.Uniform(0),
            uPerlinTexture: new THREE.Uniform(this.perlinTexture),

        }

        this.setMaterial(placeholder)
    }

    setMaterial(placeholder)
    {
        this.material = new THREE.ShaderMaterial({
            vertexShader: Vertex,
            fragmentShader: Fragment,
            // wireframe: true,
            uniforms: this.uniform,
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
        })

        placeholder.material = this.material
        
    }

    update()
    {
        this.uniform.uTime.value = this.time.elapsed * 0.001
    }
}