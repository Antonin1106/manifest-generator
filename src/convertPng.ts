export default async function convertPng(src: string, size: number) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = src;
  await img.decode();

  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(img, 0, 0, size, size);
  return canvas.toDataURL('image/png');
}
