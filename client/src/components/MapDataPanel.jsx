import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MapDataPanel = () => {
    const objectsFeaures = useSelector(s => s.objects.features);
    const polygonsFeatures = useSelector(s => s.polygons.features);

    const [allObjects, setAllObjects] = useState([]);

    useEffect(() => {
        let tempObjects = objectsFeaures.map(o => ({
            id: o.id,
            type: o.iconType || o.type,
            lat: o.geometry.coordinates[1],
            lon: o.geometry.coordinates[0]
        }
        ))


        tempObjects = [...tempObjects, ...polygonsFeatures.flatMap(p =>
            p.geometry.coordinates[0].map(([lon, lat], index) => ({
                id: `${p.id}-${index}`,
                type: 'Polygon',
                lat,
                lon
            }))
        )];

        setAllObjects(tempObjects);
    }, [objectsFeaures, polygonsFeatures])


    return (
        <div className="card">
            <div className="card-header">Map Data</div>
            <div className="card-body">
                <table>
                    <thead>
                        <tr><th>Object</th><th>Lat</th><th>Lon</th></tr>
                    </thead>
                    <tbody>
                        {allObjects.map(o => (
                            <tr key={o.id}>
                                <td>{o.type}</td>
                                <td>{o.lat}</td>
                                <td>{o.lon}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default MapDataPanel;