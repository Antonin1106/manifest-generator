// src/generateManifest.ts
// Load app's assets dynamically

import { type WebManifest } from '@json-types/web-manifest';
import generateManifestIcons from './generateManifestIcons';
import encodeManifest from './encodeManifest';

/**
 * Generates a data URI for a web manifest with icons of various sizes.
 * @param manifest The web manifest object to be converted into a data URI.
 * @param icon The URL of the icon to be used for generating different sizes.
 * @returns A promise that resolves to a data URI representing the web manifest.
 */
export default async function generateManifest(
  manifest: WebManifest,
  icon: string,
) {
  const manifestIcons = await generateManifestIcons(manifest, icon);
  return encodeManifest(manifestIcons);
}
