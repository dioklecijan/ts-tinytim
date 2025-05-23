/*!
 tinytim.js
   github.com/premasagar/tim
    A tiny, secure JavaScript micro-templating script.
    by Premasagar Rose
        dharmafly.com
    license
        opensource.org/licenses/mit-license.php
    creates global object
        tim
    v0.3.0
        
  ported and modified by LI Long <lilong@gmail.com> 3/13/2012
 */
const start = "{{";
const end = "}}";

export const tim = (() => {
  const path = "[a-z0-9_][\\.a-z0-9_]*"; // e.g. config.person.name

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return (template: string, data: any, begin = start, last = end): string => {
    const pattern = new RegExp(`${begin}\\s*(${path})\\s*${last}`, "gi");

    // Merge data into the template string
    return template.replace(pattern, (tag: string, token: string) => {
      const path = token.split(".");
      const len = path.length;
      let lookup = data;
      let i = 0;

      for (; i < len; i++) {
        lookup = lookup[path[i]];

        // Property not found
        if (lookup === undefined) {
          throw new Error(`tim: '${path[i]}' not found in ${tag}`);
        }

        // Return the required value
        if (i === len - 1) {
          return lookup;
        }
      }
    });
  };
})();
