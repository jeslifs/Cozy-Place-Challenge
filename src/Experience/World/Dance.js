import * as THREE from 'three'
import Experience from '../Experience'

export default class Dance
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        // Setup
        this.resource = this.resources.items.dancemodel

        this.setModel()
        this.setAnimation()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.5, 0.5, 0.5)
        this.model.position.set(0, -0.5, 0)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
        this.scene.add(this.model)
    }

    setAnimation()
    {
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        this.animation.man = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.lady = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.man.play()
        this.animation.lady.play()
    }


    update()
    {
        this.animation.mixer.update(this.time.delta * 0.0005)
        this.model.rotation.y += Math.PI * 0.0006
        // this.model.position.x = Math.sin(this.time.delta * 0.05)
        // this.model.position.z = Math.cos(this.time.delta * 0.05)
    }
}