import * as THREE from 'three'
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from './Camera'
import Renderer from './Renderer'
// import Stat from './Utils/Stats'
import World from './World/World'
import Resources from './Utils/Resources'
import sources from './sources'
import Debug from './Utils/Debug'

let instance = null

export default class Experience
{

    constructor(canvas)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this

        // Global Access
        // window.experience = this

        // Options
        this.canvas = canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        // if(this.debug.active)
        //     this.stats = new Stat()


        // Sizes Resize event
        this.sizes.on('resize', () => 
        {
            this.resize()
            
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
        
    }


    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        // this.stats.begin()
        this.camera.update()
        this.world.update()
        this.renderer.update()
        // this.stats.end()
    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')
        this.camera.controls.dispose()
        this.renderer.instance.dispose()
        this.scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()
                for(const key in child.material)
                {
                    const value = child.material[key]
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        if(this.debug.active)
            this.debug.ui.destroy()
    }
}