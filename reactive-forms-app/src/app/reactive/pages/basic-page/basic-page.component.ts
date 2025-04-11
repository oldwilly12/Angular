import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-basic-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './basic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPageComponent {

  private fb = inject(FormBuilder);
  formUtils = FormUtils; // funcion que creamos en utils

  myForm: FormGroup = this.fb.group({
    // name: ['', []/** Validadores sincronos*/, []/** Validadores asincronos */],  // se inicializa con el valor que queremos que tenga el campo
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  })

  // myForm = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  isValidField( fieldName: string ): boolean | null {
    return (
      this.myForm.controls[fieldName].errors &&
      this.myForm.controls[fieldName].touched) // "!!" lo convierte en boolean si hay algo o si no hay algo
  }

  getFieldError( fieldName: string ): string | null {

    if (!this.myForm.controls[fieldName]) return null;

    const errors = this.myForm.controls[fieldName].errors?? {};

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

  onSave() {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched(); // marca todos los campos como tocados para que se muestren los errores
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset({
      price: 0,
      inStorage: 0,
    })
  }
}
