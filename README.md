# legend-symbol
An expressive map symbol (`<svg/>` icon) to represent a layer styled on a mapbox-gl-js map.

Supports the following layers types

 - ![example symbol](ms_circle) `circle`
 - ![example symbol](ms_fill) `fill`
 - ![example symbol](ms_line) `line`
 - ![example symbol](ms_symbol) `symbol`
   - as icon ![example symbol](ms_icon)
   - as text ![example symbol](ms_icon)


## Usage
Here is an example using react. In the example below `map` is a instance of a mapbox-gl map and `layer` is the JSON representation of the layer you want to get a map symbol for.

```javascript
import LegendSymbol from '@mgljs-contrib/legend-symbol/react';

function Foo () {
  return (
    <LegendSymbol map={map} layer={layer} />
  );
}
```
