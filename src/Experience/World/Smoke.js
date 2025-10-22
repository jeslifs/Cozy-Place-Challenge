import * as THREE from 'three'
import Experience from '../Experience'
import Vertex from '../Shaders/Smoke/vertex.glsl'
import Fragment from '../Shaders/Smoke/fragment.glsl'

export default class Smoke
{
    constructor(placeholder)
    {
        this.experience  = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.resources = this.experience.resources
        this.perlinTexture = this.resources.items.perlinTexture
        this.perlinTexture.wrapT = THREE.RepeatWrapping
        
        this.uniform = {
            uTime: new THREE.Uniform(0),
            uPerlinTexture: new THREE.Uniform(this.perlinTexture),

        }

        this.setMaterial(placeholder)

    }

    setMaterial(placeholder)
    {
        this.material = new THREE.ShaderMaterial({
            // wireframe: true,
            vertexShader: Vertex,
            fragmentShader: Fragment,
            side: THREE.DoubleSide,
            uniforms: this.uniform,
            transparent: true,
            depthWrite: false
            
        })
        placeholder.material = this.material
    }

    update()
    {
        this.uniform.uTime.value = this.time.elapsed * 0.001
    }
}