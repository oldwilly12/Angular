import { FormGroup } from "@angular/forms";


export class FormUtils {

  // Expresiones regulares



  // para poder ivocarlo en cualquier formulario y FormGrupe no nos importa que campos maneja pero sabes que es un form group
  static isValidField( form: FormGroup, fieldName: string ): boolean | null {
    return (
      !!form.controls[fieldName].errors &&
      form.controls[fieldName].touched); // "!!" lo convierte en boolean si hay algo o si no hay algo
  }

  static getFieldError( form: FormGroup, fieldName: string ): string | null {

    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors?? {};

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
}
// how to use it in other parts
// FormUtils.isValidField()
