import './app.css';
import classnames from 'classnames';
import {render, h} from 'preact';
import {useState, useEffect, useRef} from 'preact/hooks';
import LegendSymbol from '../frameworks/preact';

const EXTERNAL_MAPBOX_GL_API_KEY = "key_replace_by_build_env";

function App (props={}) {
  const [map, setMap] = useState(null);
  const [layers, setLayers] = useState([]);
  const mapEl = useRef();

  useEffect(() => {
    mapboxgl.accessToken = EXTERNAL_MAPBOX_GL_API_KEY;
    const map = new mapboxgl.Map({
      container: mapEl.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9,
    });
    setMap(map);
    map.on("load", () => {
      setLayers(map.getStyle().layers);
    })
  }, []);

  const inViewport = new Set();
  if (map) {
    const features = map.queryRenderedFeatures();
    for (let feature of features) {
      inViewport.add(feature.layer.id);
    }
  }

  return <div className="App">
    <div className="App__map" ref={mapEl} />
    <div className="App__legend">
      <ul className="LayerList">
        {map && layers.map(layer => {
          return <li className="LayerList__item">
            <div className="LayerList__item__map-symbol">
              <LegendSymbol map={map} layer={layer} />
            </div>
            <div className={classnames({
              "LayerList__item__label": true,
              "LayerList__item__label--is-visible": inViewport.has(layer.id),
            })}>
              {layer.id}
            </div>
          </li>
        })}
      </ul>
    </div>
  </div>
}


render(h(App), document.body);
