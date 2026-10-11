import { type WebManifest } from '@json-types/web-manifest';
import generateManifestIcons from './generateManifestIcons';
import encodeManifest from './encodeManifest';
import { IconsOptions } from './types/app.types';

/**
 * Generates a data URI for a web manifest with icons of various sizes.
 * @param manifest The web manifest object to be converted into a data URI.
 * @param icon The URL of the primary icon image.
 * @param options Options for generated icons.
 * @returns A promise that resolves to a data URI representing the web manifest.
 */
export default async function generateManifest(
  manifest: WebManifest,
  icon: string,
  options: IconsOptions = {},
) {
  const manifestIcons = await generateManifestIcons(manifest, icon, options);
  return encodeManifest(manifestIcons);
}
