import Map from './components/Map';
import PolygonPanel from './components/PolygonPanel';
import ObjectsPanel from './components/ObjectsPanel';
import MapDataPanel from './components/MapDataPanel';
import './App.css';
import { useState } from 'react';
import { createPolygon } from './services/api';

const App = () => {
  const [drawingEnabled, setDrawingEnabled] = useState(false);
  const [deletingEnabled, setDeletingEnabled] = useState(false);
  const [draftPolygons, setDraftPolygons] = useState([]);

  const handleAddPolygon = () => {
    setDrawingEnabled(true);
    setDeletingEnabled(false); // Disable deleting when drawing
  };

  const handleStopDrawing = () => {
    setDrawingEnabled(false);
  };

  const handleSavePolygons = async () => {
    try {
      for (const polygon of draftPolygons) {
        await createPolygon(polygon); // API call for each polygon
      }
      alert('All polygons saved!');
      setDraftPolygons([]); // Clear local draft after saving
      setDrawingEnabled(false); // Stop drawing mode after saving
    } catch (err) {
      alert('Error saving polygons');
      console.error(err);
    }
  };

  const handleDeletePolygonClick = () => {
    setDeletingEnabled(true);
    setDrawingEnabled(false); // Disable drawing when deleting
  };

  const handleStopDeleting = () => {
    setDeletingEnabled(false);
  };

  const handlePolygonCreated = (geoJson) => {
    setDraftPolygons(prev => [...prev, geoJson]);
  };

  return (
    <div className="container">
      <div className="map-section">
        <Map
          onPolygonCreated={handlePolygonCreated}
          drawingEnabled={drawingEnabled}
          deletingEnabled={deletingEnabled}
        />
      </div>
      <div className="side-section">
        <PolygonPanel
          onAdd={handleAddPolygon}
          onStopDrawing={handleStopDrawing}
          onSave={handleSavePolygons}
          onDelete={handleDeletePolygonClick}
          onStopDeleting={handleStopDeleting}
          drawingEnabled={drawingEnabled}
          deletingEnabled={deletingEnabled}
          draftCount={draftPolygons.length}
        />
        <ObjectsPanel />
        <MapDataPanel />
      </div>
    </div>
  )
}

export default App;