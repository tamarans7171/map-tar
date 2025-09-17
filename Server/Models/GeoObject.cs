using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Server.Models
{
    public class GeoObject
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string Type { get; set; }
        public GeometryObject Geometry { get; set; }
        public string? IconType { get; set; } // אופציונלי, בשביל Marker

    }

    public class GeometryObject
    {
        public string Type { get; set; }
        public List<double> Coordinates { get; set; }
    }
}
