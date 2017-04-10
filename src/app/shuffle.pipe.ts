import { Pipe, PipeTransform } from '@angular/core';
import {Gara} from '../services/gare';


@Pipe({name: 'shuffle'})
export class ShufflePipe implements PipeTransform {
  transform(array: Gara[], args: string[]) : Gara[] {

	let currentIndex = array.length, temporaryValue, randomIndex;
	while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }
    return array
  }
}

