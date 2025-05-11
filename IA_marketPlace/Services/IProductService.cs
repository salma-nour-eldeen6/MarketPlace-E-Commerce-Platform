using IA_marketPlace.Data;

namespace IA_marketPlace.Services
{
    public interface IProductService
    {
        Task<string> AddProductAsync(ProductDTO dto, int vendorId);
        Task<List<ProductDTO>> GetAllProductPostsAsync();
        Task<string> DeleteProductPostAsync(int productId);
        Task<string> UpdateProductAsync(int productId, int vendorId, ProductDTO updatedDto);
        Task<List<object>> TrackPurchasedProductAsync(string productName);
  
        Task<List<object>> GetAllProductToVendorAsync(int userId);
   



    }
}
