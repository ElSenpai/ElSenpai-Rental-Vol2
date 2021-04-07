import { Pipe, PipeTransform } from '@angular/core';
import { Cardto } from '../models/dto/cardto';

@Pipe({
  name: 'filterCar'
})
export class FilterCarPipe implements PipeTransform {

  transform(value: Cardto[],  filterText:string): Cardto[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value
    .filter((p:Cardto)=>p.brandModel.toLocaleLowerCase().indexOf(filterText)!==-1)
    
    :value;
  }

}
