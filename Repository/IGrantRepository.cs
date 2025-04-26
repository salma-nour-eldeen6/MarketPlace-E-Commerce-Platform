

using IA_marketPlace.Models;

namespace IA_marketPlace.Repository
{
    public interface IGrantRepository : IGenericRepository<Grant>
    {
        public Task<Grant?> GetGrant(Grant grant);
    }
}
