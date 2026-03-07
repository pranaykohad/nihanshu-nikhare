import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageOptimizationService {
  /**
   * Get optimized image path - prefers WebP if supported
   * Falls back to JPEG for the same image
   */
  getOptimizedImagePath(jpegPath: string): string {
    // Simply use the JPEG path - WebP alternatives will be served via picture elements
    return jpegPath;
  }

  /**
   * Get WebP alternative for an image
   * Converts jpg extension to webp
   */
  getWebPAlternative(jpegPath: string): string {
    return jpegPath.replace(/\.jpg$/i, '.webp');
  }

  /**
   * Check if WebP is supported by browser
   */
  isWebPSupported(): boolean {
    const elem = document.createElement('canvas');
    return elem.toDataURL?.('image/webp').indexOf('image/webp') === 0;
  }
}
