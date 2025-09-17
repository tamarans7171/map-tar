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
        <div className="objects-panel">
            <h3>Object Management</h3>

            <div className="button-group">
                {!addingEnabled && !deletingEnabled && (
                    <>
                        <button onClick={onAdd}>Add Object</button>
                        <button onClick={onDelete}>Delete Object</button>
                    </>
                )}
                {addingEnabled && <button onClick={onStopAdding}>Stop Adding</button>}
                {deletingEnabled && <button onClick={onStopDeleting}>Stop Deleting</button>}
            </div>

            {draftCount > 0 && (
                <div className="draft-info">
                    <p>Draft objects: {draftCount}</p>
                    <button onClick={onSave}>Save All ({draftCount})</button>
                </div>
            )}

            <select onChange={e => dispatch(setSelectedIconType(e.target.value))}>
                {icons && Object.keys(icons).map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
        </div>

    );
};

export default ObjectsPanel;
