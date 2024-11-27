import { generateLogoSVG } from './logoGenerator';

const generateImage = async (width: number, height: number): Promise<Blob> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Canvas context not available');
  }

  // Set canvas size
  canvas.width = width;
  canvas.height = height;

  // Create SVG data URL
  const svg = new Blob([generateLogoSVG(width, height)], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(svg);

  // Load SVG into image
  const img = new Image();
  const loadPromise = new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('Failed to load SVG image'));
    img.src = url;
  });

  try {
    await loadPromise;
    // Draw white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw image to canvas
    ctx.drawImage(img, 0, 0);
    
    // Convert to JPEG
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('JPEG conversion failed'));
      }, 'image/jpeg', 0.95);
    });
  } finally {
    URL.revokeObjectURL(url);
  }
};

export const downloadLogoAsJPEG = async (size: '192' | '512' | 'feature') => {
  try {
    let width: number;
    let height: number;
    let filename: string;

    if (size === 'feature') {
      width = 1024;
      height = 500;
      filename = 'textflow-feature-graphic.jpg';
    } else {
      width = parseInt(size);
      height = width;
      filename = `textflow-logo-${size}.jpg`;
    }

    const jpegBlob = await generateImage(width, height);
    const downloadUrl = URL.createObjectURL(jpegBlob);
    
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Error generating logo:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
};