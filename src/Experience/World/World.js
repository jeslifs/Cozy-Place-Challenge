import * as THREE from 'three'
import Experience from '../Experience'
import Environment from './Environment'
import Godray from './Godray'
import CozyPlace from './CozyPlace'
import Bushs from './Bushs'

// import Floor from './Floor'
// import Fox from './Fox'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Test Mesh
        // this.defaultMesh()

        // Waiting for resources
        this.resources.on('ready', () => 
        {
            // Setup
            this.godray = new Godray()
            this.cozyplace = new CozyPlace()
            // this.bushes = new Bushs(this.cozyplace.placeholder)
            this.environment = new Environment(this.cozyplace.placeholder)
        })


        
    }

    defaultMesh()
    {
        const starterMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                // wireframe: true
            })
        )
        this.scene.add(starterMesh)
    }

    update()
    {
        if(this.godray)
            this.godray.update()
        if(this.environment)
            this.environment.update()
    }
}