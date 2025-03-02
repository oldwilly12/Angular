

interface AudioPlayer {
    audioVolume: number;
    songDuration: number;
    song: string;
    details: Details;
}

interface Details{
    author: string;
    year: number;
}

const audioPlayer: AudioPlayer = {
    audioVolume: 90,
    songDuration: 36,
    song: "Mess",
    details: {
        author: 'Ed Sheeran',
        year: 2015
    }
}

const song= 'New Song';

// song propiedad que queremos anotherSong variable name 
const { 
    song: anotherSong, 
    songDuration:duration, 
    // details: { author } 
    details
} = audioPlayer;

// desestructuracion en dos lineas
const { author } = details;

// console.log('Song:', anotherSong);
// console.log('Duration:', duration);
// console.log('Author:', author);
// console.log('Songg:', song);

// Desestructuracion de arreglos

const [ , p2, trunks ='No hay personaje']: string[] = ['Goku', 'Vegeta', 'Trunks'];

// console.log('Personaje 3: ', dbz[2] || 'No hay personaje');
// const trunks = dbz[3] || 'No hay personaje';

console.log('personaje 3: ', trunks)



export {};