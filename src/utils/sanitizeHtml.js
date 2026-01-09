import sanitizeHtml from 'sanitize-html';

const allowedTags = sanitizeHtml.defaults.allowedTags.concat(['img', 'span']);
const allowedAttributes = {
  ...sanitizeHtml.defaults.allowedAttributes,
  a: [...(sanitizeHtml.defaults.allowedAttributes?.a || []), 'rel', 'target'],
  img: [
    'src',
    'alt',
    'title',
    'width',
    'height',
    'loading',
    'srcset',
    'sizes',
  ],
  span: ['class'],
  div: ['class'],
  p: ['class'],
};
const allowedSchemes = sanitizeHtml.defaults.allowedSchemes.concat(['tel']);

const sanitizeContent = (html) =>
  sanitizeHtml(html || '', {
    allowedTags,
    allowedAttributes,
    allowedSchemes,
    transformTags: {
      a: (tagName, attribs) => {
        const next = { ...attribs };
        if (next.target === '_blank') {
          const relParts = new Set(
            (next.rel || '').split(' ').filter(Boolean)
          );
          relParts.add('noopener');
          relParts.add('noreferrer');
          next.rel = Array.from(relParts).join(' ');
        }
        return { tagName, attribs: next };
      },
    },
  });

export default sanitizeContent;
