import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet-draw';
import { deletePolygon, getPolygons } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { addDraftPolygon, fetchPolygons } from '../store/polygonsSlice';

const Map = () => {
    const dispatch = useDispatch();
    const { drawingEnabled, deletingEnabled, features } = useSelector(state => state.polygons);

    const mapRef = useRef(null);
    const leafletMapRef = useRef(null);
    const drawnItemsRef = useRef(null);
    const polygonDrawerRef = useRef(null);
    const mapInitialized = useRef(false);


    const onPolygonCreated = (geoJson) => {
        dispatch(addDraftPolygon(geoJson));
    }
    // Load polygons
    useEffect(() => {
        dispatch(fetchPolygons());
    }, [dispatch]);

    // Render polygons
    useEffect(() => {
        const drawnItems = drawnItemsRef.current;
        if (!drawnItems) return;

        drawnItems.clearLayers();
        features.forEach(feature => {
            const layer = L.geoJSON(feature);
            layer.eachLayer(l => drawnItems.addLayer(l));
        });
    }, [features]);

    // Handle deletion
    useEffect(() => {
        const drawnItems = drawnItemsRef.current;
        if (!drawnItems) return;

        drawnItems.eachLayer(layer => {
            layer.off('click');
            if (deletingEnabled && layer.feature?.id) {
                layer.on('click', async () => {
                    drawnItems.removeLayer(layer);
                    await deletePolygon(layer.feature.id);
                });
            }
        });
    }, [deletingEnabled, features]);

    // Initialize map
    useEffect(() => {
        if (!mapRef.current || leafletMapRef.current) return;

        const map = L.map(mapRef.current).setView([32.0853, 34.7818], 8);
        leafletMapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

        const drawnItems = new L.FeatureGroup();
        drawnItemsRef.current = drawnItems;
        map.addLayer(drawnItems);

        map.whenReady(() => {
            mapInitialized.current = true;
        });

        // Handle polygon creation
        map.on(L.Draw.Event.CREATED, e => {
            const layer = e.layer;
            drawnItems.addLayer(layer);
            if (onPolygonCreated) onPolygonCreated(layer.toGeoJSON());

            // Re-enable drawing (this setTimeout is necessary!)
            setTimeout(() => {
                try {
                    if (mapInitialized.current && leafletMapRef.current) {
                        const map = leafletMapRef.current;
                        const newPolygonDrawer = new L.Draw.Polygon(map, {
                            allowIntersection: false,
                            showArea: true,
                            metric: true
                        });
                        polygonDrawerRef.current = newPolygonDrawer;
                        newPolygonDrawer.enable();
                    }
                } catch (err) {
                    console.error('Error re-enabling drawing:', err);
                }
            }, 200);
        });

        return () => {
            if (polygonDrawerRef.current) polygonDrawerRef.current.disable();
            if (leafletMapRef.current) leafletMapRef.current.remove();
            mapInitialized.current = false;
        };
    }, []);

    // Handle drawingEnabled
    useEffect(() => {
        if (!mapInitialized.current) return;

        if (polygonDrawerRef.current) {
            polygonDrawerRef.current.disable();
            polygonDrawerRef.current = null;
        }

        if (drawingEnabled) {
            const map = leafletMapRef.current;
            setTimeout(() => {
                try {
                    if (!map) return;
                    const newPolygonDrawer = new L.Draw.Polygon(map, {
                        allowIntersection: false,
                        showArea: true,
                        metric: true
                    });
                    polygonDrawerRef.current = newPolygonDrawer;
                    newPolygonDrawer.enable();
                } catch (err) {
                    console.error('Error enabling drawing:', err);
                }
            }, 200);
        }
    }, [drawingEnabled]);

    return <div ref={mapRef} style={{ height: '100vh', width: '100%' }} />;
};

export default Map;
