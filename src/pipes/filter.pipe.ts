import { Pipe, PipeTransform } from '@angular/core';
import { ProductType } from 'src/models/shared-models';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(productsList: ProductType[], searchValue: string): ProductType[] {
    if (!searchValue) {
      return productsList;
    } else {
      const resultSet = [];
      for (const product of productsList) {
        if (
          product.name
            .toLocaleLowerCase()
            .indexOf(searchValue.toLocaleLowerCase()) > -1
        ) {
          resultSet.push(product);
        }
      }
      return resultSet;
    }
  }
}
