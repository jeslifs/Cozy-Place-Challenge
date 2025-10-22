import Stats from 'stats.js'

export default class Stat
{
    constructor()
    {
        this.stats = new Stats()
        // this.stats.showPanel(0)
        // this.stats.showPanel(1)
        // this.stats.showPanel(2)
        document.body.appendChild(this.stats.dom)
    }

    begin()
    {
        this.stats.begin()
    }

    end()
    {
        this.stats.end()
    }
}