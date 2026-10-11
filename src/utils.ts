import convertImage from './convertImage';
import { AdditionalIconOptions, IconsOptions } from './types/app.types';

const DEFAULT_SIZES = [72, 96, 128, 144, 152, 192, 384, 512, 1024];

/**
 * Build the list of icon sources used for the app manifest.
 * @param icon The main icon source path.
 * @param options The global icon settings and any extra icons.
 * @returns The default icon source followed by all additional configured icons.
 */
export function resolveIconSources(
  icon: string,
  options: IconsOptions,
): AdditionalIconOptions[] {
  return [{ src: icon }, ...(options.additionalIcons ?? [])];
}

/**
 * Generate the full icon set for a given source including resized versions.
 * @param source The icon definition to process.
 * @param options The default icon settings inherited for this build.
 * @returns An array of icons ready to be included in the manifest.
 */
export async function buildIconSet(
  source: AdditionalIconOptions,
  options: IconsOptions,
) {
  const { sizes, type, sourceType, purpose, includeOriginal, quality } =
    resolveSourceOptions(source, options);

  validateIconOptions(type, sizes, quality);

  const originalIcon = includeOriginal
    ? [{ src: source.src, sizes: 'any', type: sourceType, purpose }]
    : [];

  const resizedIcons = await Promise.all(
    sizes.map(async (size) => ({
      src: await convertImage(source.src, size, type, quality),
      sizes: `${size}x${size}`,
      type,
      purpose,
    })),
  );

  return [...originalIcon, ...resizedIcons];
}

/**
 * Resolve the effective icon settings by merging source values with defaults.
 * @param source The icon definition that may override the default options.
 * @param options The default icon configuration.
 * @returns The final values used to generate the icon set.
 */
function resolveSourceOptions(
  source: AdditionalIconOptions,
  options: IconsOptions,
) {
  const sizes = source.sizes ?? options.sizes ?? DEFAULT_SIZES;
  const type = source.type ?? options.type ?? 'image/png';
  const sourceType = source.sourceType ?? options.sourceType ?? 'image/svg+xml';
  const purpose = source.purpose ?? options.purpose ?? 'any maskable';
  const includeOriginal =
    source.includeOriginal ?? options.includeOriginal ?? true;
  const quality = source.quality ?? options.quality;

  return { sizes, type, sourceType, purpose, includeOriginal, quality };
}

/**
 * Validate the final icon configuration before resizing and exporting images.
 * @param type The output MIME type used for generated icons.
 * @param sizes The sizes that must be generated.
 * @param quality The optional compression quality for lossy formats.
 */
function validateIconOptions(
  type: string,
  sizes: number[],
  quality: number | undefined,
) {
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(type))
    throw new TypeError('Icon output type must be png, jpeg, or webp.');

  if (sizes.some((size) => !Number.isInteger(size) || size <= 0))
    throw new RangeError('Icon sizes must be positive integers.');

  if (
    quality !== undefined &&
    (!Number.isFinite(quality) || quality < 0 || quality > 1)
  )
    throw new RangeError('Image quality must be a number between 0 and 1.');
}
