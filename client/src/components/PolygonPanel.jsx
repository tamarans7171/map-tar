const PolygonPanel = ({ 
    onAdd, 
    onStopDrawing, 
    onSave, 
    onDelete, 
    onStopDeleting, 
    drawingEnabled, 
    deletingEnabled, 
    draftCount 
}) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '8px' }}>
            <h3>Polygon Management</h3>
            <div style={{ marginBottom: '8px' }}>
                {!drawingEnabled && !deletingEnabled ? (
                    <>
                        <button onClick={onAdd}>Add Polygon</button>
                        <button onClick={onDelete} style={{ marginLeft: '8px' }}>Delete Polygon</button>
                    </>
                ) : drawingEnabled ? (
                    <button onClick={onStopDrawing}>Stop Drawing</button>
                ) : deletingEnabled ? (
                    <button onClick={onStopDeleting}>Stop Deleting</button>
                ) : null}
            </div>
            
            {draftCount > 0 && (
                <div style={{ marginTop: '8px' }}>
                    <p>Draft polygons: {draftCount}</p>
                    <button onClick={onSave}>Save All ({draftCount})</button>
                </div>
            )}
            
            {drawingEnabled && (
                <p style={{ fontSize: '12px', color: '#666' }}>
                    Click on the map to start drawing a polygon
                </p>
            )}
            
            {deletingEnabled && (
                <p style={{ fontSize: '12px', color: '#666' }}>
                    Click on any polygon to delete it
                </p>
            )}
        </div>
    );
};

export default PolygonPanel;