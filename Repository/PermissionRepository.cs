//using ECommerce.Data;
//using ECommerce.Models;
//using ECommerce.Repo;
//using ECommerce.Repositories.Interfaces;
using IA_marketPlace.Data;
using IA_marketPlace.Models;
using IA_marketPlace.Repository;
using Microsoft.EntityFrameworkCore;

namespace IA_marketPlace.Repository 
{ 
    public class PermissionRepository : GenericRepository<Permission>, IPermissionRepository
    {
        private readonly MarketplaceContext _dbContext;

        public PermissionRepository(MarketplaceContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Permission> GetPermissionByTypeAsync(string permissionType)
        {
            return await _dbContext.Permissions.FirstOrDefaultAsync(p => p.PermissionType == permissionType);
        }
    }
}
