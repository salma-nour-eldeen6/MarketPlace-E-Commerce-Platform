using IA_marketPlace.Models;

namespace IA_marketPlace.Repository
{
    public interface IVendorRepository : IGenericRepository<Vendor>
    {
        Task<Vendor> GetVendorByUserIdAsync(int userId);
    }
}
