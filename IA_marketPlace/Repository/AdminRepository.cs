
using IA_marketPlace.Data;
using IA_marketPlace.Models;
using IA_marketPlace.Repository;
using Microsoft.EntityFrameworkCore;


namespace IA_marketPlace.Repository
{
    public class AdminRepository(MarketplaceContext _dbContext) : GenericRepository<User>(_dbContext), IAdminRepository
    {
       

    }
}
