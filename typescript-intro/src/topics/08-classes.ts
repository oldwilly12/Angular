


export class Person {
    // public name: string;
    // public address: string;

    // crea las propiedades y las inicializa
    constructor(
        public name: string, 
        public address: string = 'No Address'
    ) {}


}

// export class Hero extends Person {

//     constructor(
//         public alterEgo: string,
//         public age: number,
//         public realName: string,
//     ) {

//         super( realName, 'NY')
//     }
// }
export class Hero {

    // public person: Person;

    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
        public person: Person,
    ) {

        this.person = new Person(realName);
        

    }
}

const tony = new Person ('Tony Stark', 'New York');
const ironman = new Hero('Ironman', 45,'Tony', tony);

console.log(ironman);


