import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-optimized-img',
  standalone: true,
  imports: [CommonModule],
  template: `
    <picture>
      <source [srcset]="webpPath" type="image/webp" />
      <img [src]="jpegPath" [alt]="alt" [loading]="loading || 'lazy'" />
    </picture>
  `,
  styles: [
    `
      picture {
        display: contents;
      }
      img {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class OptimizedImgComponent {
  @Input() jpegPath!: string;
  @Input() alt: string = '';
  @Input() loading: 'lazy' | 'eager' = 'lazy';

  get webpPath(): string {
    return this.jpegPath.replace(/\.jpg$/i, '.webp');
  }
}
