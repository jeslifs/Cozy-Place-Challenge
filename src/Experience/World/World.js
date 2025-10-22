import * as THREE from 'three'
import Experience from '../Experience'
import Environment from './Environment'
import Godray from './Godray'
import CozyPlace from './CozyPlace'
import Sky from './Sky'
import FireFlies from './FireFlies'
import Dance from './Dance'
import Song from './Song'

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
            this.song = new Song()
            this.godray = new Godray()
            this.cozyplace = new CozyPlace()
            this.fireflies = new FireFlies()
            // this.bushes = new Bushs(this.cozyplace.placeholder)
            this.sky = new Sky()
            this.dance = new Dance()
            this.environment = new Environment(this.cozyplace.placeholder, this.cozyplace.tent)
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
        if(this.dance)
            this.dance.update()
        if(this.fireflies)
            this.fireflies.update()
    }
}