import Map from './components/Map';
import PolygonPanel from './components/PolygonPanel';
import ObjectsPanel from './components/ObjectsPanel';
import MapDataPanel from './components/MapDataPanel';
import './App.css';

const App = () => {

  return (
    <div className="container">
      <div className="map-section">
        <Map />
      </div>
      <div className="side-section">
        <PolygonPanel />
        <ObjectsPanel />
        <MapDataPanel />
      </div>
    </div>
  )
}

export default App;