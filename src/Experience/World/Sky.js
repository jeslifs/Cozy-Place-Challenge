import * as THREE from 'three'
import Experience from '../Experience'
import Vertex from '../Shaders/Sky/vertex.glsl'
import Fragment from '../Shaders/Sky/fragment.glsl'

export default class Sky
{
    constructor()
    {
        this.experience  = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Sky')
            this.debugFolder.close()
        }

        this.skyColor = {
            // #d7007e
            
            // top: '#5160b3', '#1a5ca2'
            top: '#1a5ca2',
            bottom: '#0c0034',
        }

        this.setSkyGeometry()
        this.setSkyMaterial()
        this.setSky()
    }

    setSkyGeometry()
    {
        this.geometry = new THREE.SphereGeometry(10000, 32, 16)
    }

    setSkyMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            // wireframe: true,
            side: THREE.BackSide,
            vertexShader: Vertex,
            fragmentShader: Fragment,
            uniforms: {
                topColor: new THREE.Uniform(new THREE.Color(this.skyColor.top)),
                bottomColor: new THREE.Uniform(new THREE.Color(this.skyColor.bottom)),
                offset      : { value : -5000 },
                multiplier  : { value : 10000 },
                minClamp    : { value : -1 },
                maxClamp    : { value : 1 }
            }

        })
    }

    setSky()
    {
        this.sky = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.sky)

        if(this.debug.active)
        {
            this.debugFolder.addColor(this.skyColor, 'top').name('top color').onChange(() => this.material.uniforms.topColor.value.set(this.skyColor.top))
            this.debugFolder.addColor(this.skyColor, 'bottom').name('bottom color').onChange(() => this.material.uniforms.bottomColor.value.set(this.skyColor.bottom))
        }
    }
}