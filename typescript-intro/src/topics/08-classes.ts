


export class Person {
    // public name: string;
    // public address: string;

    // crea las propiedades y las inicializa
    constructor(
        public name: string, 
        public address: string = 'No Address'
    ) {}


}


const ironman = new Person('Ironman', 'New York');

console.log(ironman);


