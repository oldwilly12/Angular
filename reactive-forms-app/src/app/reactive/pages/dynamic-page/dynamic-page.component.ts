import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './dynamic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicPageComponent {

  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  // FormGroup tenga el tipado para hacer mas facil la validacion de las propiedades
  myForm: FormGroup = this.fb.group({

    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Final Fantasy', Validators.required],
    ],
    Validators.minLength(3) // Validaciones al arreglo
  ),

  });

  newFavorite = new FormControl('', Validators.required);
  // newFavorite = this.fb.control([''])

  // getter invocar poperty
  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray; // decirle que es un array
  }

  // isValidFieldInArray( formArray: FormArray,  index: number ) {
  //   return (
  //     formArray.controls[index].errors && formArray.controls[index].touched
  //   )
  // }


  onAddToFavorites() {
    if ( this.newFavorite.invalid ) return ; //si no es valido hacer un return

    const newGame = this.newFavorite.value; // obtener el valor del input

    this.favoriteGames.push(this.fb.control( newGame, Validators.required));

    this.newFavorite.reset(); // limpiar el input
  }

  // eliminar con el index
  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index); // eliminar el elemento del array

  }

  onSubmit() {
    this.myForm.markAllAsTouched(); // marcar todos los campos como tocados para que se muestren los errores

  }
}
