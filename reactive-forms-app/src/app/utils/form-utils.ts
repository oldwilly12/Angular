import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";


export class FormUtils {

  // Expresiones regulares

  static getTextError( errors: ValidationErrors) {
    for( const key of Object.keys( errors )) { // forma de barrer todas las llaves de este objeto
      switch ( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo de ${ errors['minlength'].requiredLength } caracteres.`;
        case 'min':
          return `Valor Minimo de ${ errors['min'].min }.`;
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

}
// how to use it in other parts
// FormUtils.isValidField()
