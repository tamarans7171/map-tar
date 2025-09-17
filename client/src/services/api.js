import axios from 'axios';

const API_URL = 'http://localhost:5231/api';

const geoJsonFeaturesURL = `${API_URL}/GeoJsonFeatures`;
const geoObjectsURL = `${API_URL}/geoObjects`;

export const getPolygons = async () => {
    const response = await axios.get(geoJsonFeaturesURL);
    return response.data;
};

export const createPolygon = async (Polygon) => {
    const polygonCopy = JSON.parse(JSON.stringify(Polygon));

    delete polygonCopy.properties;
    const response = await axios.post(geoJsonFeaturesURL, polygonCopy, { headers: { "Content-Type": "application/json" } });
    return response.data;
};

export const deletePolygon = async (id) => {
    await axios.delete(`${geoJsonFeaturesURL}/${id}`);
};

export const getObjects = async () => {
    const response = await axios.get(geoObjectsURL);
    return response.data;
};
export const createObject = async (Polygon) => {
    const polygonCopy = JSON.parse(JSON.stringify(Polygon));

    delete polygonCopy.properties;
    const response = await axios.post(geoObjectsURL, polygonCopy, { headers: { "Content-Type": "application/json" } });
    return response.data;
};

export const deleteObject = async (id) => {
    await axios.delete(`${geoObjectsURL}/${id}`);
};