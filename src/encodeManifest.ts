import { WebManifest } from '@json-types/web-manifest';

/**
 * Encodes a web manifest object into a data URI format.
 * @param manifest The web manifest object to be encoded.
 * @returns A data URI string representing the encoded web manifest.
 */
export default function encodeManifest(manifest: WebManifest) {
  return (
    'data:application/manifest+json,' +
    encodeURIComponent(JSON.stringify(manifest))
  );
}
