import { readFileSync } from "node:fs";
import { tim } from "./tinytim";
export { tim };

/**
 * Intermediate js cache.
 *
 * @type Object
 */

let cache: Record<string, string> = {};

/**
 * Clear intermediate js cache.
 *
 * @api public
 */

export const clearCache = () => {
  cache = {};
};

/**
 * Render the given `str` of tim.
 *
 * @param {String}
 *            str
 * @param {Object}
 *            vars
 * @return {String}
 * @api public
 */

export const render = tim;

/**
 * Render an tim file at the given `path`.
 *
 * @api public
 */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const renderFile = (path: string, vars: any, useCache = false) => {
  const key = `${path}:string`;
  let str: string;
  if (useCache && cache[key]) str = cache[key];
  else {
    cache[key] = readFileSync(path, "utf8");
    str = cache[key];
  }
  return render(str, vars);
};
