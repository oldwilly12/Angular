import { FormGroup } from "@angular/forms";


export class FormUtils {

  // Expresiones regulares

  static isValidField( form: FormGroup, fieldName: string ): boolean | null {
    return (
      !!form.controls[fieldName].errors &&
      form.controls[fieldName].touched) // "!!" lo convierte en boolean si hay algo o si no hay algo
  }

}
// how to use it in other parts
// FormUtils.isValidField()
