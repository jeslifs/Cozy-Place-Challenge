import * as THREE from 'three'
import Experience from '../Experience'
import Vertex from '../Shaders/FireFlies/vertex.glsl'
import Fragment from '../Shaders/FireFlies/fragment.glsl'

export default class FireFlies
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.debug = this.experience.debug

        this.FireFliesParameters = {
            count: 100,
            // color: '#ffffff',
            color: '#ffe070'
        }

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('FireFlies')
            this.debugFolder.close()
        }
        
        // Setup
        this.setGeometry()
        this.setMaterial()
        this.setFireFlies()
    }

    setGeometry()
    {
        this.firefliesgeometry = new THREE.BufferGeometry()
        this.firefliescount = this.FireFliesParameters.count
        this.position = new Float32Array(this.firefliescount * 3)
        this.scale = new Float32Array(this.firefliescount)

        for(let i = 0; i < this.firefliescount; i++)
        {
            let i3 = i * 3
            this.position[i3] = (Math.random() - 0.5) * 8.5
            this.position[i3 + 1] = Math.random()  * 2.5 + 0.2
            this.position[i3 + 2] = (Math.random() - 0.5) * 8.5
            this.scale[i] = Math.random()
        }
        this.firefliesgeometry.setAttribute('position', new THREE.BufferAttribute(this.position, 3))
        this.firefliesgeometry.setAttribute('aScale', new THREE.BufferAttribute(this.scale, 1))


        if(this.fireflies) {
            this.fireflies.geometry.dispose()
            this.fireflies.geometry = this.firefliesgeometry
        }
    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            vertexShader: Vertex,
            fragmentShader: Fragment,
            uniforms:
            {
                uTime: new THREE.Uniform(0),
                uColor: new THREE.Uniform(new THREE.Color(this.FireFliesParameters.color)),
                uPixelRatio: new THREE.Uniform(this.sizes.pixelRatio),
                uSize: new THREE.Uniform(100),
                uProgress: new THREE.Uniform(0)
            },
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        })

        // debug
        if(this.debug.active)
        {
            this.debugFolder.addColor(this.FireFliesParameters, 'color').name('fireFliesColor').onChange(()=> this.material.uniforms.uColor.value.set(this.FireFliesParameters.color))
            this.debugFolder.add(this.FireFliesParameters, 'count').name('fireFliesCount').min(30).max(100).step(1).onFinishChange(()=> {this.setGeometry()})
        }
    }

    setFireFlies()
    {
        this.fireflies = new THREE.Points(this.firefliesgeometry, this.material)
        this.fireflies.position.y = -0.5
        this.scene.add(this.fireflies)
        
    }


    update()
    {
        this.material.uniforms.uTime.value = this.time.elapsed * 0.001
    }
}