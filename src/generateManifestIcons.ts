// src/generateManifest.ts
// Load app's assets dynamically

import { type WebManifest } from '@json-types/web-manifest';
import convertPng from './convertPng';

/**
 * Genrates icons of various sizes for a web manifest and returns the updated manifest.
 * @param manifest The web manifest object to be updated with icons.
 * @param icon The URL of the icon to be used for generating different sizes.
 * @returns A promise that resolves to the updated web manifest with icons.
 */
export default async function generateManifestIcons(
  manifest: WebManifest,
  icon: string,
) {
  const sizes = [72, 96, 128, 144, 152, 192, 384, 512, 1024];

  (manifest.icons as unknown) = [
    ...(await Promise.all(
      sizes.map(async (size) => ({
        src: await convertPng(icon, size),
        sizes: `${size}x${size}`,
        type: 'image/png',
        purpose: 'any maskable',
      })),
    )),
  ];

  return manifest;
}
