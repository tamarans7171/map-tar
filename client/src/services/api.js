import axios from 'axios';

const API_URL = 'http://localhost:5231/api/GeoJsonFeatures';

export const getPolygons = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createPolygon = async (Polygon) => {
    const polygonCopy = JSON.parse(JSON.stringify(Polygon));

    delete polygonCopy.properties;
    const response = await axios.post(API_URL, polygonCopy, { headers: { "Content-Type": "application/json" } });
    return response.data;
};

export const deletePolygon = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const getObjects = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
export const createObject = async (Polygon) => {
    const polygonCopy = JSON.parse(JSON.stringify(Polygon));

    delete polygonCopy.properties;
    const response = await axios.post(API_URL, polygonCopy, { headers: { "Content-Type": "application/json" } });
    return response.data;
};

export const deleteObject = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};