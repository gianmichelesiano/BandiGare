import { Pipe } from '@angular/core';

@Pipe({ name: 'gareFilter' })
export class gareFilter {
    transform(gare, [key]) {
        return gare.filter(gara => {
            return gare[key] === true; 
        });
    }
}