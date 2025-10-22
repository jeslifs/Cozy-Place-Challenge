export default class Song
{
    constructor()
    {
        this.songpath = './songs/Wonderful-Tonight.mp3'
        this.song = new Audio(this.songpath)
        this.song.loop = true
        this.song.volume = 0.5

        const startSong = () => {
            this.song.play()
            window.removeEventListener('click', startSong)
            window.removeEventListener('touchstart', () => startSong)
        }

        window.addEventListener('click', startSong)
        window.addEventListener('touchstart', () => startSong)

    }


    
  


}