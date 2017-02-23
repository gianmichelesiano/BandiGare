
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'importo'})
export class ImportoPipe implements PipeTransform {
  transform(value: string) : string {
    value = value.replace(".","")
    value = value.replace(",",".")
    if (value.includes("ND")){
    		value = "0.00"
    }

    return value;
  }
}
