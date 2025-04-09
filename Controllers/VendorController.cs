using e_commerce.Data;
using e_commerce.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace e_commerce.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendorController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VendorController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Vendor
        [HttpGet]
        public async Task<ActionResult> GetVendors()
        {
            var vendors = await _context.Users.Where(u => u.Role == "Vendor").ToListAsync();
            return Ok(vendors);
        }

        // GET: api/Vendor/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetVendor(int id)
        {
            var vendor = await _context.Users.FindAsync(id);
            if (vendor == null)
            {
                return NotFound();
            }
            return Ok(vendor);
        }

        // POST: api/Vendor
        [HttpPost]
        public async Task<ActionResult<User>> PostVendor(User vendor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Users.Add(vendor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVendor), new { id = vendor.UserID }, vendor);
        }

        // PUT: api/Vendor/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVendor(int id, User vendor)
        {
            if (id != vendor.UserID)
            {
                return BadRequest();
            }

            _context.Entry(vendor).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Vendor/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVendor(int id)
        {
            var vendor = await _context.Users.FindAsync(id);
            if (vendor == null)
            {
                return NotFound();
            }

            _context.Users.Remove(vendor);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
