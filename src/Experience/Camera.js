import * as THREE from 'three'
import Experience from './Experience'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug

        this.setInstance()
        this.setOrbitControls()

        
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(
            35, 
            this.sizes.width / this.sizes.height,
            0.1,
            100000
        )
        // this.instance.position.set(-0.0158, 3.0054, 7.9365)
        this.instance.position.set(0.0226, 4.3036, 11.3648)
        this.instance.lookAt(0, 0, 0)
        this.scene.add(this.instance)
        
    }

    setOrbitControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        if(!this.debug.active)
        {
            this.controls.minPolarAngle = Math.PI / 7
            this.controls.maxPolarAngle = Math.PI / 2.1
            this.controls.maxDistance = 24

        }

    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
        // console.log(this.instance.position)
    }

}