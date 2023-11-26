import { FilterPipe } from './filter.pipe';

describe('UserFilterPipe', () => {
  const productListMock: any[] = [
    {
      name: 'Visa Tarjeta',
    },
  ];

  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should not transform due empty search', () => {
    const pipe = new FilterPipe();

    const result = pipe.transform(productListMock, '');
    expect(result.length).toBe(1);
  });

  it('should search and check transform is valid and have no results', () => {
    const pipe = new FilterPipe();
    const result = pipe.transform(productListMock, 'value');
    expect(result.length).toBe(0);
  });

  it('should search and check transform is valid and have results', () => {
    const pipe = new FilterPipe();
    const result = pipe.transform(productListMock, 'Visa');
    expect(result.length).toBe(1);
  });
});
