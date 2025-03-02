

export interface Products {
    description: string;
    price: number;

}

const phone: Products = {
    description: 'Nokia A1',
    price: 150.0
}

const tablet: Products = {
    description: 'iPad Air',
    price: 250.0
}

interface TaxCalculatorOptions {
    tax: number;
    products: Products[];
}

// objeto personalizado por lo que se hace la interface
// desestructuracion de los valores de regreso de la funcion
// function taxCalculator( { tax, products }: TaxCalculatorOptions ): [number, number] {
export function taxCalculator( options: TaxCalculatorOptions ): [number, number] {

    const { tax, products } = options;

    let total = 0;
    
    products.forEach( ({ price }) => {
        // total = total + product.price;
        total += price;
    });

    return [ total, total * tax ];

}


// const shopingCart = [phone, tablet];

// const tax = 0.15;


// const [ total, taxTotal ] = taxCalculator({
//     // tax: tax,
//     tax,
//     products: shopingCart
// })


// console.log('Total:', total);
// console.log('Tax:', taxTotal);


