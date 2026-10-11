export default async function convertImage(
  src: string,
  size: number,
  type: string = 'image/png',
  quality?: number,
) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = src;
  await img.decode();

  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx)
    throw new Error(
      'Unable to create a 2D canvas context for icon conversion.',
    );
  ctx.drawImage(img, 0, 0, size, size);
  return canvas.toDataURL(type, quality);
}
