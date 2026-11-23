import { posix } from 'node:path';
import { spanish } from './es.mjs';
import { escape } from './templates.mjs';
import { phases } from './products.mjs';

const unchanged = new Set([
  '.', 'Aikya', 'Aikya Harness', 'Aikya Forge', 'Aikya Mods', 'Harness', 'Forge', 'Mods',
  'Flow', 'Usage', 'BoxBot', 'Aikya Flow', 'Aikya Usage', 'Aikya BoxBot', 'GitHub',
  'Claude Code', 'Claude Code + Aikya Mods', 'Claude · Codex', 'ODD / SDD',
  '/aikya-analyze', 'aikya', 'main', '© 2026 Aikya', '⌘', '○', '◐', '✓', ...phases,
]);
const decode = (text) => text.replace(/&(amp|lt|gt|quot|#39);/g, (_, code) =>
  ({amp:'&',lt:'<',gt:'>',quot:'"','#39':"'"})[code]);
export function translate(text) {
  if (unchanged.has(text)) return text;
  if (Object.hasOwn(spanish, text)) return spanish[text];
  if (text.endsWith(' · Aikya')) return translate(text.slice(0, -8)) + ' · Aikya';
  throw new Error(`Missing Spanish translation: ${text}`);
}

const publicRoot = 'https://jlema0590.github.io/aikya-page/';
const localeRoute = (route, locale) => (locale === 'es' ? 'es/' : '') + route;
function localeSwitch(route, locale) {
  const current = localeRoute(route, locale);
  const language = locale === 'en' ? 'es' : 'en';
  const target = localeRoute(route, language);
  const href = (posix.relative('/' + current, '/' + target) || '.') + '/';
  return `<a class="language-toggle" data-language="${locale}" href="${href}" lang="${language}" hreflang="${language}" aria-label="${language === 'en' ? 'English' : 'Español'}" title="${language === 'en' ? 'Cambiar a inglés' : 'Switch to Spanish'}"><span aria-hidden="true">EN</span><span aria-hidden="true">ES</span></a>`;
}

// Translate only text and editorial attributes in our controlled, generated templates.
// URLs, SVG geometry, code names and other structural attributes are never translated.
export function localize(html, route, locale) {
  if (locale === 'es') {
    let inCode = false;
    html = html.split(/(<[^>]+>)/g).map((token) => {
      if (/^<code(?:\s|>)/.test(token)) inCode = true;
      if (token === '</code>') inCode = false;
      if (token.startsWith('<')) {
        token = token.replace(/(aria-label|content)="([^"]*)"/g, (match, name, value) => {
          if (name === 'content' && !/^<meta (?:name="description"|property="og:(?:title|description)")/.test(token)) return match;
          return `${name}="${escape(translate(decode(value)))}"`;
        });
        return token.replace(/((?:href|src)=")((?:\.\.\/|\.\/)+assets\/)/g, '$1../$2');
      }
      if (inCode || !token.trim()) return token;
      const leading = token.match(/^\s*/)[0], trailing = token.match(/\s*$/)[0];
      return leading + escape(translate(decode(token.trim()))) + trailing;
    }).join('');
    html = html.replace('lang="en"', 'lang="es"').replace(
      `<link rel="canonical" href="${publicRoot}${route}">`,
      `<link rel="canonical" href="${publicRoot}es/${route}">`,
    );
  }
  const alternates = ['en','es','x-default'].map((language) =>
    `<link rel="alternate" hreflang="${language}" href="${publicRoot}${localeRoute(route, language)}">`).join('');
  html = html.replace('</head>', alternates + '</head>');
  html = html.replace('<a class="header-github"', `<div class="header-actions">${localeSwitch(route, locale)}<a aria-label="GitHub" class="header-github"`);
  html = html.replace('</a></header>', '</a></div></header>');
  return html;
}
