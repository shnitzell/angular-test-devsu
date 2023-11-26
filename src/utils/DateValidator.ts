import { FormControl } from '@angular/forms';

export class DateValidator {
  public static gtToday(control: FormControl): { [key: string]: any } {
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    var varDate = new Date(control.value);

    if (!(varDate >= today)) {
      return { gtToday: true };
    }

    return null;
  }
}
