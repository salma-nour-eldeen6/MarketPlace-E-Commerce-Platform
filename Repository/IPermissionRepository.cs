

using IA_marketPlace.Models;
using IA_marketPlace.Repository;

namespace IA_marketPlace.Repository
{
    public interface IPermissionRepository : IGenericRepository<Permission>
    {
        public Task<Permission> GetPermissionByTypeAsync(string permissionType);
    }
}
