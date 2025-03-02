


// <T> se crea una funcion Generica
// es como si la funcion dijera pueden asignarme el tipo de dato el argumento sera de ese tipo de dato y la respuesta de igual manera
export function whatsMyType<T>( argument: T ): T {


    return argument;
}



let amIString = whatsMyType<string>('Hola Mundo');
let amINumber = whatsMyType<number>(100);
let amIArray = whatsMyType<number[]>([1,2,3,4,5]);

console.log(amIString.split(' '));
console.log(amINumber.toFixed());
console.log(amIArray.join('-'));