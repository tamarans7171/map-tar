// store/polygonsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPolygons, createPolygon, deletePolygon } from '../services/api';

export const fetchPolygons = createAsyncThunk('polygons/fetch', async () => {
    const data = await getPolygons();
    return data;
});

export const saveDraftPolygon = createAsyncThunk('polygons/save', async (polygon) => {
    const saved = await createPolygon(polygon);
    return saved;
});

export const removePolygon = createAsyncThunk('polygons/delete', async (id) => {
    await deletePolygon(id);
    return id;
});

const polygonsSlice = createSlice({
    name: 'polygons',
    initialState: {
        features: [],
        draftPolygons: [],
        loading: false,
        error: null,
        drawingEnabled: false,
        deletingEnabled: false
    },
    reducers: {
        addDraftPolygon: (state, action) => {
            state.draftPolygons.push(action.payload);
        },
        clearDraftPolygons: state => {
            state.draftPolygons = [];
        },
        setDrawingEnabled: (state, action) => {
            state.drawingEnabled = action.payload;
        },
        setDeletingEnabled: (state, action) => {
            state.deletingEnabled = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPolygons.fulfilled, (state, action) => {
                state.features = action.payload;
            })
            .addCase(saveDraftPolygon.fulfilled, (state, action) => {
                state.features = [...state.features, action.payload];
                state.draftPolygons = state.draftPolygons.filter(
                    p => p.id !== action.payload.id
                );
            })
            .addCase(removePolygon.fulfilled, (state, action) => {
                state.features = state.features.filter(f => f.id !== action.payload);
            });
    }
});

export const { addDraftPolygon, clearDraftPolygons, setDrawingEnabled, setDeletingEnabled } = polygonsSlice.actions;
export default polygonsSlice.reducer;
