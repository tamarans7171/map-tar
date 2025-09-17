using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Services
{
    public class MongoService
    {
        private readonly IMongoCollection<GeoJsonFeature> _features;
        private readonly IMongoCollection<GeoObject> _objects;

        public MongoService(IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase("GeoMapDB");
            _features = database.GetCollection<GeoJsonFeature>("GeoJsonFeatures");
            _objects = database.GetCollection<GeoObject>("GeoObjects");
        }

        public async Task<List<GeoJsonFeature>> GetAllFeaturesAsync()
        {
            return await _features.Find(_ => true).ToListAsync();
        }
        public async Task CreateFeatureAsync(GeoJsonFeature feature)
        {
            await _features.InsertOneAsync(feature);
        }


        public async Task<bool> DeleteFeatureAsync(string id)
        {
            var result = await _features.DeleteOneAsync(f => f.Id == id);
            return result.DeletedCount > 0;
        }
        public async Task<List<GeoObject>> GetAllObjectsAsync()
        {
            return await _objects.Find(_ => true).ToListAsync();
        }
        public async Task CreateObjectAsync(GeoObject geoObject)
        {
            await _objects.InsertOneAsync(geoObject);
        }


        public async Task<bool> DeleteObjectAsync(string id)
        {
            var result = await _objects.DeleteOneAsync(f => f.Id == id);
            return result.DeletedCount > 0;
        }

    }
}