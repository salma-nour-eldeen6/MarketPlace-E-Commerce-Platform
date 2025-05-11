using IA_marketPlace.Data;
using IA_marketPlace.Models;
using Microsoft.EntityFrameworkCore;

namespace IA_marketPlace.Repository
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(MarketplaceContext context) : base(context) { }
        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products.FirstOrDefaultAsync(p => p.ProductId == id);
        }
        

        public async Task<List<string>> GetProductsNameByVendorAsync(int vendorId)
        {
            return await _context.Products
                                 .Where(p => p.VendorId == vendorId)
                                 .Select(p => p.Name)
                                 .Distinct()
                                 .ToListAsync();
        }





    }

}

