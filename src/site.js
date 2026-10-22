const base = import.meta.env.BASE_URL;

/** Prefix only site-root links, preserving fragments and external protocols. */
export function sitePath(path) {
  if (!path?.startsWith('/') || path.startsWith('//')) return path;
  return `${base}${path.slice(1)}`;
}

export function pagePath(pathname) {
  const local = base !== '/' && pathname.startsWith(base)
    ? pathname.slice(base.length - 1)
    : pathname === base.slice(0, -1) ? '/' : pathname;
  return local.replace(/index\.html$/, '').replace(/\/?$/, '/');
}
