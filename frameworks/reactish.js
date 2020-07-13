export default function reactish (legendSymbol, createElement, {useState, useEffect}) {
  function attrReplace (attrs) {
    const out = {};
    Object.entries(attrs).forEach(([k, v]) => {
      k = k.replace(/-./g, (i) => {
        return i.slice(1).toUpperCase();
      });
      out[k] = v;
    });
    return out;
  }

  /**
   * Turns a JSON tree into react components
   */
  function asReact (tree) {
    if (!tree) return null;
    return createElement(
      tree.element,
      attrReplace(tree.attributes),
      (tree.children ? tree.children.map(asReact) : undefined)
    );
  }

  return function Component ({map, layer}) {
    const [loaded, setLoaded] = useState(false);
    const [zoom, setZoom] = useState(map.getZoom());

    useEffect(() => {
      const zoomHandler = () => {
        setZoom(map.getZoom());
      };
      const loadHandler = () => {
        setLoaded(true);
      }
      map.on("zoom", zoomHandler);
      map.on("load", loadHandler);

      return () => {
        map.off("zoom", zoomHandler);
        map.off("load", loadHandler);
      }
    }, [map]);

    const tree = legendSymbol({map, layer, zoom});
    return asReact(tree);
  }
}
