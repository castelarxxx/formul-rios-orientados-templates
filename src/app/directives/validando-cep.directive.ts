import { Directive } from "@angular/core";
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
  Validator,
} from "@angular/forms";
import { map, Observable } from "rxjs";

@Directive({
  selector: "[validandorCep]",
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ValidandoCepDirective,
      multi: true,
    },
  ],
})
export class ValidandoCepDirective implements AsyncValidator {
  consultaCepService: any;

  constructor() {}
  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const cep = control.value;

    return this.consultaCepService
      .getConsultaCep(cep)
      .pipe(
        map((resultado: any) =>
          resultado.erro ? { validadorCep: true } : null
        )
      );
  }
}
