# manifest-generator

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT) ![Last commit](https://img.shields.io/github/last-commit/Antonin1106/manifest-generator)

A browser side library that generates configurable icons and a Web App Manifest data URI.

## Installation

```sh
npm install manifest-generator
```

## Quick start

```ts
import { createLink, generateManifest } from 'manifest-generator';

const manifest = {
  name: 'My application',
  short_name: 'My app',
  start_url: '/',
  display: 'standalone',
  theme_color: '#3367D6',
};

const href = await generateManifest(manifest, '/icons/app.svg');
createLink('manifest', href);
```

Pass standard manifest properties in `manifest`. The generator adds icons and returns a data URI; `createLink` adds it to the page.

## Customize icons

Pass options as the third argument. Defaults generate PNG icons at 72, 96, 128, 144, 152, 192, 384, 512, and 1024 pixels, plus the original image entry.

```ts
const href = await generateManifest(manifest, '/icons/app.svg', {
  sizes: [128, 256, 512],
  type: 'image/webp',
  purpose: 'any',
  includeOriginal: false,
  quality: 0.85,
  additionalIcons: [
    {
      src: '/icons/compact.png',
      sizes: [96, 192],
      sourceType: 'image/png',
    },
  ],
});
```

| Option            | Default                                        | Description                                           |
| ----------------- | ---------------------------------------------- | ----------------------------------------------------- |
| `sizes`           | `[72, 96, 128, 144, 152, 192, 384, 512, 1024]` | Positive square sizes in pixels.                      |
| `type`            | `'image/png'`                                  | Generated format: PNG, JPEG, or WebP.                 |
| `sourceType`      | `'image/svg+xml'`                              | MIME type declared for the original image.            |
| `purpose`         | `'any maskable'`                               | Icon purpose value.                                   |
| `includeOriginal` | `true`                                         | Include the original image URL in the manifest.       |
| `quality`         | Browser default                                | Encoding quality from `0` to `1` (JPEG/WebP).         |
| `additionalIcons` | `[]`                                           | Extra image sources; each can override these options. |

## API reference

- `generateManifest(manifest, icon, options?)` : generates icons and returns a manifest data URI. Updates `manifest.icons`.
- `generateManifestIcons(manifest, icon, options?)` : generates and returns the updated manifest.
- `encodeManifest(manifest)` : encodes a manifest as a data URI without generating icons.
- `createLink(rel, href)` : adds a `<link>` element to `document.head`.

Icon generation requires a browser. Remote images must allow cross-origin canvas access.

---

## Author - [Antonin1106](https://github.com/Antonin1106)

Passionate student developer with a strong interest in Web Development, Computer Science, and Electronics.
