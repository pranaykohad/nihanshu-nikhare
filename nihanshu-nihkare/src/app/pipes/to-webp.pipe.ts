import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toWebP',
  standalone: true,
})
export class ToWebPPipe implements PipeTransform {
  transform(imagePath: string): string {
    if (!imagePath) return imagePath;
    return imagePath.replace(/\.jpg$/i, '.webp');
  }
}
