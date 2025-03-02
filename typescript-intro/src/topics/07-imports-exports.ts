import { Products, taxCalculator } from "./06-functions-destructuring";

const shoppingCart: Products[] = [
    {
        description: 'Nokia',
        price: 150.0
    },
    {
        description: 'iPad',
        price: 100.0    }
];


 const [ total, taxTotal ] = taxCalculator({
    tax: 0.15,
    products: shoppingCart
 });

 console.log('Total:', total);
 console.log('Tax:', taxTotal);
