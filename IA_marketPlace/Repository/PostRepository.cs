
using IA_marketPlace.Data;
using IA_marketPlace.Models;
using IA_marketPlace.Repository;

namespace IA_marketPlace.Repository
{
    public class PostRepository(MarketplaceContext _dbContext) : GenericRepository<Post>(_dbContext), IPostRepository
    {
    }
}
