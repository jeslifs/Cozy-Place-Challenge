export default class Song
{
    constructor()
    {
        this.songpath = './songs/Wonderful-Tonight.mp3'
        this.song = new Audio(this.songpath)
        this.song.loop = true
        this.song.volume = 0.5
        this.mutebutton = document.getElementById('muteButton')
        this.ismuted = false
        // console.log(this.mutebutton)
        

        // setup
        this.unmutesvg = `
            <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
        `

        this.mutesvg = `
            <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
        
        `
        this.mutebutton.innerHTML = this.unmutesvg
        this.startSong = () => {
            this.song.play()
            window.removeEventListener('click', this.startSong)
            window.removeEventListener('touchstart', () => this.startSong)
        }

        window.addEventListener('click', this.startSong)
        window.addEventListener('touchstart', () => this.startSong)

        this.mutebutton.addEventListener('click', () => {
            this.ismuted = !this.ismuted

            if(this.ismuted)
            {
                this.song.volume = 0
                this.mutebutton.innerHTML = this.mutesvg
            }
            else
            {
                this.song.volume = 0.5
                this.mutebutton.innerHTML = this.unmutesvg
            }
        })

    }


    
  


}