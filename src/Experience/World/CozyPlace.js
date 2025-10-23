import * as THREE from 'three'
import Experience from '../Experience'
export default class CozyPlace
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Setup
        this.resource = this.resources.items.cozyplace
        // console.log(this.resource)
        this.placeholder = []
        this.tent = []
        

        this.setModel()
    }

    setModel()
    {
        const regex = /^leaves\w+/
        this.model = this.resource.scene
        this.model.traverse((child) =>
        {
            // console.log(child, child.name)
            if(child instanceof THREE.Object3D)
            {
                if(child.name !== 'grass')
                {
                    child.castShadow = true
                    // child.receiveShadow = true
                }
                if((child.name === 'fire') || (child.name === 'smoke'))
                {
                    child.castShadow = false
                    // console.log(child, 'hi')
                    
                    this.tent.push(child)

                }
                if(child.name === 'grass')
                {
                    child.receiveShadow = true
                }
            }
            if(child instanceof THREE.Object3D && regex.test(child.name))
            {
                // console.log(child.name, child.parent.name)
                // console.log(child.position);
                this.placeholder.push(child)
                // child.castShadow = true
            }
            
        })
        // console.log(this.tent)
        this.scene.add(this.model)
    }
}