using IA_marketPlace.Data;
using IA_marketPlace.Models;
using Microsoft.EntityFrameworkCore;

namespace IA_marketPlace.Repository
{
    public class VendorRepository : GenericRepository<Vendor>, IVendorRepository
    {
        private readonly MarketplaceContext _context;

        public VendorRepository(MarketplaceContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Vendor> GetVendorByUserIdAsync(int userId)
        {
            return await _context.Vendors.FirstOrDefaultAsync(v => v.VendorId == userId);
        }
    }
}
