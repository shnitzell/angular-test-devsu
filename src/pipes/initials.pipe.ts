import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
})
export class InitialsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    const names = value.split(' ');
    const firstName = names[0].charAt(0).toUpperCase();
    let lastName = '';

    if (names.length > 1) {
      lastName = names[names.length - 1].charAt(0).toUpperCase();
    }
    return firstName + lastName;
  }
}
