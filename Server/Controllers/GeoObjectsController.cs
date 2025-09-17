using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeoObjectsController : ControllerBase
    {
        private readonly MongoService _mongoService;

        public GeoObjectsController(MongoService mongoService)
        {
            _mongoService = mongoService;
        }

        [HttpPost]
        public async Task<ActionResult<GeoObject>> CreateGeoObject([FromBody] GeoObject geoObject)
        {
            await _mongoService.CreateObjectAsync(geoObject);
            return CreatedAtAction(nameof(CreateGeoObject), new { id = "newId" }, geoObject);
        }

        [HttpGet]
        public async Task<ActionResult<List<GeoObject>>> GetAllGeoObjects()
        {
            var geoObjects = await _mongoService.GetAllObjectsAsync();
            return Ok(geoObjects);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGeoObject(string id)
        {
            var deleted = await _mongoService.DeleteObjectAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}