import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
@Pipe({name: 'exponentialStrength'})
export class ExponentialStrengthPipe implements PipeTransform {
  transform(value: string, args: string[]) : string {
    let limit = args.length > 0 ? parseInt(args[0], 10) : 10;
    let trail = args.length > 1 ? args[1] : '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}