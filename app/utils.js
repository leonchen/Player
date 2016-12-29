const TYPES = {};

export function types(namespace, ...ts) {
  const sub = TYPES[namespace] = {};
  for (const type of ts) {
    sub[type] = `${namespace}.${type}`;
  }
  return sub;
}
