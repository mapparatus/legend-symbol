import React from 'react';

/**
 * Turns a JSON tree into react components
 */
function asReact (tree) {
  return React.element(
    tree.element,
    tree.attributes,
    tree.children.map(asReact)
  );
}

function (map, layer) {
  return asReact(legendSymbol(map, layer));
}
