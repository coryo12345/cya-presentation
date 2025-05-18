import { ITEMS } from './game/items';
import { PAGES } from './game/pages';

export default () => ({
  name: 'dynamic-preload',
  transformIndexHtml: {
    order: 'pre',
    handler(html) {
      return html.replace(/<%=\s*preload\s*%>/gi, (match) => {
        const links = [];

        for (const page of PAGES) {
          if (page.image) {
            links.push(buildLinkTag(page.image));
          }
          if (page.actions) {
            for (const action of page.actions) {
              if (action.image) {
                links.push(buildLinkTag(action.image));
              }
            }
          }
          if (page.links) {
            for (const link of page.links) {
              if (link.image) {
                links.push(buildLinkTag(link.image));
              }
            }
          }
        }

        for (const item of ITEMS) {
          if (item.image) {
            links.push(buildLinkTag(item.image));
          }
        }

        return links.join('\n');
      });
    },
  },
});

function buildLinkTag(src) {
  return `<link rel="preload" as="image" href="${src}">`;
}
