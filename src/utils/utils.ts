import marked from 'marked';
import Prism from 'prismjs';

export function rendererLink(href: string, title: string, text: string) {
  let url = href;
  let target: boolean | string = false;

  if (url.slice(0, 1) !== '#') {
    const urlParams = new URL(href, window.location.origin);

    url = urlParams.href;

    target = urlParams.host !== window.location.host ? '_blank' : false;
  }

  if (!url) {
    return text;
  }

  let out = `<a href="${url}"`;
  if (title) {
    out += ` title="${title}"`;
  }
  if (target !== false) {
    out += ` target="${target}"`;
  }
  out += `>${text}</a>`;

  return out;
}

export function rendererParagraph(text: string) {
  // replaceUserMention
  const regExp = /(^| +)@(?!_)(?!.*?_$)(?<username>[a-zA-Z0-9_\u4e00-\u9fa5]{1,10})( +|$)/g;
  return `<p>${text.replace(regExp, '$1<a href="/$2">@$2</a>$3')}</p>`;
}

export function getDefaultMarkedOptions() {
  const renderer = new marked.Renderer();

  renderer.link = rendererLink;
  renderer.paragraph = rendererParagraph;

  return {
    renderer,
    headerIds: false,
    gfm: true,
    breaks: true,
    highlight(code: string, lang: string) {
      if (lang) {
        const language = lang.toLowerCase();
        const grammar = Prism.languages[language];
        if (grammar) {
          return Prism.highlight(code, grammar, language);
        }
      }

      return code;
    },
  };
}

export function resetMarkedOptions() {
  marked.setOptions(getDefaultMarkedOptions());
}
