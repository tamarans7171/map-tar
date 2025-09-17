import { useSelector } from "react-redux";

const MapDataPanel = () => {
    const objects = useSelector(s => s.objects.features);
    return (
        <div className="card">
            <div className="card-header">Map Data</div>
            <div className="card-body">
                <table>
                    <thead>
                        <tr><th>Object</th><th>Lat</th><th>Lon</th></tr>
                    </thead>
                    <tbody>
                        {objects.map(o => (
                            <tr key={o.Id || o.id}>
                                <td>{o.type || o.iconType}</td>
                                <td>{o.geometry.coordinates[1]}</td>
                                <td>{o.geometry.coordinates[0]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default MapDataPanel;