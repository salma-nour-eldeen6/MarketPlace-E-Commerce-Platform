using IA_marketPlace.Models;

namespace IA_marketPlace.Repository
{
    public interface IProductRepository : IGenericRepository<Product>
    {
         Task<Product> GetProductByIdAsync(int id);
    }
}
