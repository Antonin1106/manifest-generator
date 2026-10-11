/**
 * Creates a link element and appends it to the document head.
 * @param rel The rel attribute of the link element.
 * @param href The URL of the linked resource.
 * @returns The created link element.
 */
export default function createLink(rel: string, href: string) {
  const link = document.createElement('link');
  link.rel = rel;
  link.href = href;
  document.head.appendChild(link);
  return link;
}
