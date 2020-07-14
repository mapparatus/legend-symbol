import './app.css';
import classnames from 'classnames';
import {render, h} from 'preact';
import {useState, useEffect, useRef} from 'preact/hooks';
import LegendSymbol from '../frameworks/preact';

const EXTERNAL_MAPBOX_GL_API_KEY = "key_replace_by_build_env";

function App (props={}) {
  const [map, setMap] = useState(null);
  const [showOnlyRendered, setShowOnlyRendered] = useState(false);
  const [inViewport, setInViewport] = useState(new Set);
  const [layers, setLayers] = useState([]);
  const mapEl = useRef();

  useEffect(() => {
    mapboxgl.accessToken = EXTERNAL_MAPBOX_GL_API_KEY;
    const map = new mapboxgl.Map({
      container: mapEl.current,
      // style: 'mapbox://styles/mapbox/streets-v11',
      // style: 'https://s3-eu-west-1.amazonaws.com/tiles.os.uk/v2/styles/open-zoomstack-outdoor/style.json',
      style: 'https://s3-eu-west-1.amazonaws.com/tiles.os.uk/v2/styles/open-zoomstack-road/style.json',
      zoom: 2,
      hash: true,
    });
    setMap(map);

    const loadHandler = () => {
      setLayers(map.getStyle().layers);
    }

    const featuresHandler = () => {
      const inViewport = new Set();
      if (map) {
        const features = map.queryRenderedFeatures();
        for (let feature of features) {
          inViewport.add(feature.layer.id);
        }
      }
      setInViewport(inViewport);
    }

    map.on("load", loadHandler);
    map.on("idle", featuresHandler);

    return () => {
      map.off("load", loadHandler);
      map.off("idle", featuresHandler);
    }
  }, []);

  function onChangeShowOnlyRendered (e) {
    const {checked} = e.target;
    setShowOnlyRendered(checked);
  }


  return <div className="App">
    <div className="App__map" ref={mapEl} />
    <div className="App__legend">
      <div className="App__legend__header">
        <h1 className="App__legend__header__h1">Legend</h1>
        <label>
          <input type="checkbox" value={showOnlyRendered} onChange={onChangeShowOnlyRendered}/> Only rendered
        </label>
      </div>
      <ul className={classnames({
        "LayerList": true,
        "LayerList--only-rendered": showOnlyRendered,
      })}>
        {map && layers.map(layer => {
          const isInViewport = inViewport.has(layer.id);
          return <li className={classnames({
            "LayerList__item": true, 
            "LayerList__item--visible": isInViewport, 
          })}>
            <div className="LayerList__item__map-symbol">
              <LegendSymbol map={map} layer={layer} />
            </div>
            <div className={classnames({
              "LayerList__item__label": true,
              "LayerList__item__label--is-visible": isInViewport,
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
