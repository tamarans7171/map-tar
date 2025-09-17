using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeoJsonFeaturesController : ControllerBase
    {
        private readonly MongoService _mongoService;

        public GeoJsonFeaturesController(MongoService mongoService)
        {
            _mongoService = mongoService;
        }

        [HttpPost]
        public async Task<ActionResult<GeoJsonFeature>> CreateFeature([FromBody] GeoJsonFeature feature)
        {
            await _mongoService.CreateFeatureAsync(feature);
            return CreatedAtAction(nameof(CreateFeature), new { id = "newId" }, feature);
        }

        [HttpGet]
        public async Task<ActionResult<List<GeoJsonFeature>>> GetAllFeatures()
        {
            var features = await _mongoService.GetAllFeaturesAsync();
            return Ok(features);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeature(string id)
        {
            var deleted = await _mongoService.DeleteFeatureAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}