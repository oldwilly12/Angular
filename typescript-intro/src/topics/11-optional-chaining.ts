
export interface Passenger {
    name: string;
    children?: string[];

}


const passenger1: Passenger = {
    name: 'Willy',

}

const passenger2: Passenger = {
    name: 'Fernando',
    children: ['Natalia', 'Elizabeth']
}


const printChildren = (passenger: Passenger) => {

    // Optional chaining, si tienen la propiedad children entonces se ejecuta el length
    const howManyChildren = passenger.children?.length || 0;

    console.log(howManyChildren);

}

printChildren(passenger1);
printChildren(passenger2);