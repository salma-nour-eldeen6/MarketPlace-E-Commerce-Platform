//using ECommerce.Data;
//using ECommerce.DTOS;
//using ECommerce.Models;
//using ECommerce.Repo;
//using ECommerce.Repositories.Interfaces;

using IA_marketPlace.Data;
using IA_marketPlace.Models;
using IA_marketPlace.Repository;

namespace IA_marketPlace.Repository
{
    public class GrantRepository(MarketplaceContext _dbContext) : GenericRepository<Grant>(_dbContext), IGrantRepository
    {
        public async Task<Grant?> GetGrant(Grant grant)
        {
            return await _dbContext.Grants.FindAsync(grant.AdminId, grant.VendorId, grant.PermissionId);
        }
    }
}
