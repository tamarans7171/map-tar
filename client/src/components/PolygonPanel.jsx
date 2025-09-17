import { useDispatch, useSelector } from 'react-redux'
import { clearDraftPolygons, saveDraftPolygon, setDeletingEnabled, setDrawingEnabled } from '../store/polygonsSlice';

const PolygonPanel = () => {

    const dispatch = useDispatch();
    const { draftPolygons, drawingEnabled, deletingEnabled } = useSelector(state => state.polygons);
    const draftCount = draftPolygons.length;

    const onAdd = () => {
        dispatch(setDrawingEnabled(true));
        dispatch(setDeletingEnabled(false));
    }

    const onStopDrawing = () => {
        dispatch(setDrawingEnabled(false));
    }

    const onDelete = () => {
        dispatch(setDeletingEnabled(true));
        dispatch(setDrawingEnabled(false));
    }

    const onStopDeleting = () => {
        dispatch(setDeletingEnabled(false));
    }

    const onSave = async () => {
        try {
            for (const polygon of draftPolygons) {
                await dispatch(saveDraftPolygon(polygon)).unwrap();
            }
            dispatch(clearDraftPolygons());
            dispatch(setDrawingEnabled(false));
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="polygon-panel">
            <h3>Polygon Management</h3>

            <div className="button-group">
                {!drawingEnabled && !deletingEnabled ? (
                    <>
                        <button onClick={onAdd}>Add Polygon</button>
                        <button onClick={onDelete}>Delete Polygon</button>
                    </>
                ) : drawingEnabled ? (
                    <button onClick={onStopDrawing}>Stop Drawing</button>
                ) : deletingEnabled ? (
                    <button onClick={onStopDeleting}>Stop Deleting</button>
                ) : null}
            </div>

            {draftCount > 0 && (
                <div className="draft-info">
                    <p>Draft polygons: {draftCount}</p>
                    <button onClick={onSave}>Save All ({draftCount})</button>
                </div>
            )}

            {drawingEnabled && (
                <p className="instruction">
                    Click on the map to start drawing a polygon
                </p>
            )}

            {deletingEnabled && (
                <p className="instruction">
                    Click on any polygon to delete it
                </p>
            )}
        </div>

    );
};

export default PolygonPanel;