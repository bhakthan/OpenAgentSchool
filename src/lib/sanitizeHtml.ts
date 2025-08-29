export function sanitizeHtml(input: string): string {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, 'text/html');
    // Remove scripts and styles
    doc.querySelectorAll('script, style, iframe, object, embed').forEach((el) => el.remove());
    // Strip event handlers and javascript: URLs
    const walk = (node: Element) => {
      [...node.attributes].forEach((attr) => {
        const name = attr.name.toLowerCase();
        const val = (attr.value || '').toLowerCase();
        if (name.startsWith('on') || val.startsWith('javascript:')) {
          node.removeAttribute(attr.name);
        }
      });
      node.querySelectorAll('*').forEach((child) => walk(child as Element));
    };
    doc.body.querySelectorAll('*').forEach((el) => walk(el as Element));
    return doc.body.innerHTML;
  } catch {
    // Fallback: escape angle brackets (ES2019-compatible)
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
