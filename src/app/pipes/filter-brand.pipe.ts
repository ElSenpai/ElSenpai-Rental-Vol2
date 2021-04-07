import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'filterBrand'
})
export class FilterBrandPipe implements PipeTransform {

  transform(value: Brand[], filterBrandText:string): Brand[] {
    filterBrandText = filterBrandText?filterBrandText.toLocaleLowerCase():""
    return filterBrandText?value
    .filter((p:Brand)=>p.brandName.toLocaleLowerCase().indexOf(filterBrandText)!==-1)
    :value;
  }

}
