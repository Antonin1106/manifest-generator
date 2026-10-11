import { type WebManifest } from '@json-types/web-manifest';
import { IconsOptions } from './types/app.types';
import { buildIconSet, resolveIconSources } from './utils';

/**
 * Generates configurable icons for a web manifest and returns the updated manifest.
 * @param manifest The web manifest object to be updated with icons.
 * @param icon The URL of the primary icon image.
 * @param options Options for image sizes, formats, and additional icon sources.
 * @returns A promise that resolves to the updated web manifest with icons.
 */
export default async function generateManifestIcons(
  manifest: WebManifest,
  icon: string,
  options: IconsOptions = {},
) {
  const sources = resolveIconSources(icon, options);
  const icons = await Promise.all(
    sources.map(async (source) => buildIconSet(source, options)),
  );

  (manifest.icons as unknown) = icons.flat();

  return manifest;
}
