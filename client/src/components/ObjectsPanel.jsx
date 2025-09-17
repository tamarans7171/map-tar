import { useDispatch, useSelector } from 'react-redux';
import { setAddingEnabled, setDeletingEnabled, clearDraftObjects, setSelectedIconType } from '../store/objectsSlice';
import { createObject } from '../services/api';
import { icons } from './utils';

const ObjectsPanel = () => {
    const dispatch = useDispatch();
    const { draftObjects, addingEnabled, deletingEnabled } = useSelector(state => state.objects);
    const draftCount = draftObjects.length;

    const onAdd = () => {
        dispatch(setAddingEnabled(true));
        dispatch(setDeletingEnabled(false));
    };
    const onStopAdding = () => dispatch(setAddingEnabled(false));
    const onDelete = () => {
        dispatch(setDeletingEnabled(true));
        dispatch(setAddingEnabled(false));
    };
    const onStopDeleting = () => dispatch(setDeletingEnabled(false));

    const onSave = async () => {
        for (const obj of draftObjects) {
            await createObject(obj);
        }
        dispatch(clearDraftObjects());
        dispatch(setAddingEnabled(false));
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '8px' }}>
            <h3>Object Management</h3>
            {!addingEnabled && !deletingEnabled && (
                <>
                    <button onClick={onAdd}>Add Object</button>
                    <button onClick={onDelete} style={{ marginLeft: '8px' }}>Delete Object</button>
                </>
            )}
            {addingEnabled && <button onClick={onStopAdding}>Stop Adding</button>}
            {deletingEnabled && <button onClick={onStopDeleting}>Stop Deleting</button>}

            {draftCount > 0 && (
                <div>
                    <p>Draft objects: {draftCount}</p>
                    <button onClick={onSave}>Save All ({draftCount})</button>
                </div>
            )}

            <select onChange={e => dispatch(setSelectedIconType(e.target.value))}
                style={{ marginTop: '8px' }}>
                {icons && Object.keys(icons).map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
        </div>
    );
};

export default ObjectsPanel;
