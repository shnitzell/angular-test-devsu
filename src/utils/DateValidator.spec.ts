import { DateValidator } from './DateValidator';

describe('DateValidatorForm', () => {
  it('create an instance', () => {
    const pipe = new DateValidator();
    expect(pipe).toBeTruthy();
  });

  it('should not transform due empty search', () => {
    const today = new Date(); // get today's date
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const formControl: any = {
      value: tomorrow,
    };
    const result = DateValidator.gtToday(formControl);
    expect(result).toBeNull();
  });

  it('should not transform due empty search', () => {
    const today = new Date(); // get today's date
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() - 1);

    const formControl: any = {
      value: tomorrow,
    };
    const result = DateValidator.gtToday(formControl);
    expect(result['gtToday']).toBeTruthy();
  });
});
