import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

async function sleep() {
  return new Promise( resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2500)
  });
}

export class FormUtils {

  // Expresiones regulares
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError( errors: ValidationErrors) {

    // {
    //   "pattern": {
    //     "requiredPattern": "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",
    //     "actualValue": "asdf"
    //   }
    // }

    for( const key of Object.keys( errors )) { // forma de barrer todas las llaves de este objeto
      switch ( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo de ${ errors['minlength'].requiredLength } caracteres.`;
        case 'min':
          return `Valor Minimo de ${ errors['min'].min }.`;
        case 'email':
          return 'Email no valido';
        case 'emailTaken':
          return 'El correo electronico ya esta siendo usado por otro usuario';
        case 'noStrider':
          return 'El nombre de usuario no puede ser strider';
        case 'pattern':
          if( errors['patter'].requiredPattern === FormUtils.emailPattern) { // se puso entre [] para computar el valor y que de valor booleano
            return 'El valor ingresado no luce como un correo electronico';
          }


        return 'Error de patron contra expresion regular'

        default:
          return `Error de validacion no controlado ${ key }`;
      }
  }
  return null;
  }

  // para poder ivocarlo en cualquier formulario y FormGrupe no nos importa que campos maneja pero sabes que es un form group
  static isValidField( form: FormGroup, fieldName: string ): boolean | null {
    return (
      !!form.controls[fieldName].errors &&
      form.controls[fieldName].touched); // "!!" lo convierte en boolean si hay algo o si no hay algo
  }

  static getFieldError( form: FormGroup, fieldName: string ): string | null {

    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static isValidFieldInArray( formArray: FormArray,  index: number ) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldErrorInArray( formArray: FormArray, index: number ): string | null {

    if (formArray.controls.length === 0) return null; // si no tiene un controles o estan vacios

    const errors = formArray.controls[index].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static isFieldOneEqualFieldTwo( field1: string, field2: string) {
    // abstractControl perimite acceder a todo el formulario en el cual nostors colocamos esta validacion
    return ( formGroup: AbstractControl ) => { // funcion tiene que regresar una funcion, y esa funcion debe retornar null o un objeto

      const field1Value =  formGroup.get(field1)?.value;
      const field2Value =  formGroup.get(field2)?.value;

      return field1Value === field2Value ? null : { passwordsNotEqual: true };

      // Ejemplo de lo que debe regresar
      // return null;
      // return {
      //   passwordsNotEqual: true
      // }
    }
  }

  // VALIDACION PERSONALIZADA ASINCRONA
  static async checkingServerResponse( control: AbstractControl ): Promise<ValidationErrors | null>{ // como es metodo asincrono debe regresar una promesa

    await sleep(); // simular una peticion al servidor esperar 2 segundos

    const formValue = control.value; // tomar valor de formulario, valor de el control

    if( formValue ===  'hola@mundo.com' ){
      return {
        emailTaken: true
      }
    }
    return null;
  }

  // VALIDACION PERSONALIZADA SINCRONA
  static notStrider( control: AbstractControl ): ValidationErrors | null{

    const formValue = control.value; // tomar valor de formulario, valor de el control
    if( formValue === 'strider' ){
      return {
        noStrider: true
      }
    }
    return null;
    // { noStrider: true } ?? null
  }

}
// how to use it in other parts
// FormUtils.isValidField()
