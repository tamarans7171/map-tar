import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-draw';
import { useDispatch, useSelector } from 'react-redux';
import { addDraftPolygon, fetchPolygons, removePolygon } from '../store/polygonsSlice';
import { addDraftObject, removeObject, fetchObjects } from '../store/objectsSlice';
import { icons } from './utils';

const Map = () => {
    const dispatch = useDispatch();
    const { drawingEnabled, deletingEnabled, features: polygonFeatures } = useSelector(state => state.polygons);
    const { addingEnabled, deletingEnabled: deletingObjects, features: objectFeatures, selectedIconType } = useSelector(state => state.objects);

    const mapRef = useRef(null);
    const leafletMapRef = useRef(null);
    const drawnItemsRef = useRef(null);
    const polygonDrawerRef = useRef(null);
    const mapInitialized = useRef(false);

    // Handle polygon creation
    const onPolygonCreated = (geoJson) => {
        dispatch(addDraftPolygon(geoJson));
    }

    // Handle object creation
    const onObjectCreated = (objGeoJson) => {
        dispatch(addDraftObject(objGeoJson));
    }

    const getIconByType = (iconType) => {
        return icons[iconType] || icons.default;
    };

    // Load polygons on mount
    useEffect(() => {
        dispatch(fetchPolygons());
        dispatch(fetchObjects());
    }, [dispatch]);

    // Initialize map
    useEffect(() => {
        if (!mapRef.current || leafletMapRef.current) return;

        const map = L.map(mapRef.current).setView([32.0853, 34.7818], 8);
        leafletMapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

        const drawnItems = new L.FeatureGroup();
        drawnItemsRef.current = drawnItems;
        map.addLayer(drawnItems);

        map.whenReady(() => { mapInitialized.current = true; });

        // Polygon draw
        map.on(L.Draw.Event.CREATED, e => {
            const layer = e.layer;
            drawnItems.addLayer(layer);
            onPolygonCreated(layer.toGeoJSON());

            // Re-enable drawing
            setTimeout(() => {
                if (mapInitialized.current && leafletMapRef.current) {
                    const newDrawer = new L.Draw.Polygon(map, { allowIntersection: false, showArea: true, metric: true });
                    polygonDrawerRef.current = newDrawer;
                    newDrawer.enable();
                }
            }, 200);
        });

        return () => {
            if (polygonDrawerRef.current) polygonDrawerRef.current.disable();
            map.remove();
            mapInitialized.current = false;
        }
    }, []);

    // Handle drawing polygons
    useEffect(() => {
        if (!mapInitialized.current) return;

        if (polygonDrawerRef.current) polygonDrawerRef.current.disable();
        polygonDrawerRef.current = null;

        if (drawingEnabled) {
            const map = leafletMapRef.current;
            setTimeout(() => {
                const newDrawer = new L.Draw.Polygon(map, { allowIntersection: false, showArea: true, metric: true });
                polygonDrawerRef.current = newDrawer;
                newDrawer.enable();
            }, 200);
        }
    }, [drawingEnabled]);

    // Handle adding markers
    useEffect(() => {
        if (!mapInitialized.current) return;

        const map = leafletMapRef.current;
        const drawnItems = drawnItemsRef.current;

        const handleClick = (e) => {
            if (!addingEnabled) return;

            const icon = L.icon({
                iconUrl: getIconByType(selectedIconType),
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32],
            });

            const newObj = { type: 'Marker', geometry: { type: 'Point', coordinates: [e.latlng.lng, e.latlng.lat] }, iconType: selectedIconType };
            drawnItems.addLayer(L.marker([e.latlng.lat, e.latlng.lng], { icon }));

            onObjectCreated(newObj);
        };

        map.on('click', handleClick);
        return () => { map.off('click', handleClick); }
    }, [addingEnabled]);

    // Render all features
    useEffect(() => {
        const drawnItems = drawnItemsRef.current;
        if (!drawnItems) return;

        drawnItems.clearLayers();

        // Polygons
        polygonFeatures.forEach(feature => {
            const layer = L.geoJSON(feature);
            layer.eachLayer(l => drawnItems.addLayer(l));
        });

        // Objects / markers

        objectFeatures.forEach(feature => {
            if (feature.geometry.type === 'Point') {
                const iconUrl = getIconByType(feature.iconType || 'default');
                const [lng, lat] = feature.geometry.coordinates;
                const icon = L.icon({
                    iconUrl: iconUrl,
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -32],
                });

                const marker = L.marker([lat, lng], { icon });
                marker.feature = feature; // Attach feature for deletion
                drawnItems.addLayer(marker);
            }
        });
    }, [polygonFeatures, objectFeatures]);

    // Handle deletion polygons
    useEffect(() => {
        const drawnItems = drawnItemsRef.current;
        if (!drawnItems) return;

        drawnItems.eachLayer(layer => {
            layer.off('click');
            if (deletingEnabled && layer.feature?.id) {
                layer.on('click', async () => {
                    drawnItems.removeLayer(layer);
                    dispatch(removePolygon(layer.feature.id))
                });
            }
        });
    }, [deletingEnabled, polygonFeatures]);

    // Handle deletion objects
    useEffect(() => {
        const drawnItems = drawnItemsRef.current;
        if (!drawnItems) return;

        drawnItems.eachLayer(layer => {
            layer.off('click');
            if (deletingObjects && layer.feature?.geometry.type === 'Point') {
                layer.on('click', async () => {
                    drawnItems.removeLayer(layer);
                    dispatch(removeObject(layer.feature.id));  // ✅ שולח ל-Redux
                });
            }
        });
    }, [deletingObjects, objectFeatures]);

    return <div ref={mapRef} style={{ height: '100vh', width: '100%' }} />;
};

export default Map;
