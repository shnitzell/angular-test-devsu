import { Pipe, PipeTransform } from '@angular/core';
import { ProductType } from 'src/models/shared-models';

@Pipe({
  name: 'maxitems',
})
export class MaxItemsPipe implements PipeTransform {
  transform(productsList: ProductType[], searchValue: number): ProductType[] {
    if (!searchValue) {
      return productsList;
    } else {
      const resultSet = [];
      for (const product of productsList) {
        if (resultSet.length < searchValue) {
          resultSet.push(product);
        }
      }
      return resultSet;
    }
  }
}
