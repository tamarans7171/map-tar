import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getObjects, createObject, deleteObject } from '../services/api';

// Async thunks
export const fetchObjects = createAsyncThunk('objects/fetch', async () => {
  return await getObjects();
});

export const saveDraftObject = createAsyncThunk('objects/save', async (obj) => {
  return await createObject(obj);
});

export const removeObject = createAsyncThunk('objects/delete', async (id) => {
  await deleteObject(id);
  return id;
});

const objectsSlice = createSlice({
  name: 'objects',
  initialState: {
    features: [],
    draftObjects: [],
    loading: false,
    error: null,
    addingEnabled: false,
    deletingEnabled: false,
    selectedIconType: 'default'
  },
  reducers: {
    addDraftObject: (state, action) => {
      state.draftObjects.push(action.payload);
    },
    clearDraftObjects: (state) => {
      state.draftObjects = [];
    },
    setAddingEnabled: (state, action) => {
      state.addingEnabled = action.payload;
    },
    setDeletingEnabled: (state, action) => {
      state.deletingEnabled = action.payload;
    },
    setSelectedIconType: (state, action) => {
      state.selectedIconType = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchObjects.fulfilled, (state, action) => {
        state.features = action.payload;
      })
      .addCase(saveDraftObject.fulfilled, (state, action) => {
        state.features.push(action.payload);
      })
      .addCase(removeObject.fulfilled, (state, action) => {
        state.features = state.features.filter(f => f.id !== action.payload);
      });
  }
});

export const { addDraftObject, clearDraftObjects, setAddingEnabled, setDeletingEnabled, setSelectedIconType } = objectsSlice.actions;
export default objectsSlice.reducer;
