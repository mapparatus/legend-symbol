import Circle from "./src/Circle";
import Fill from "./src/Fill";
import Line from "./src/Line";
import Symbol from "./src/Symbol";
import {exprHandler} from './src/util';


const TYPE_MAP = {
  "circle": Circle,
  "symbol": Symbol,
  "line": Line,
  "fill": Fill,
}

export default function ({map, layer}) {
  const handler = TYPE_MAP[layer.type];
  const expr = exprHandler(map);

  if (handler) {
    return handler({map, layer, expr});
  }
  else {
    return null;
  }
}
