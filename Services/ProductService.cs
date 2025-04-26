using IA_marketPlace.Data;
using IA_marketPlace.Models;
using IA_marketPlace.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Security.Claims;

namespace IA_marketPlace.Services
{
    public class ProductService : IProductService
    {
        private readonly MarketplaceContext _context;
        private readonly IProductRepository _productRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ProductService(MarketplaceContext context, IProductRepository productRepository, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _productRepository = productRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<string> AddProductAsync(ProductDTO dto, int vendorId)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Name.ToLower() == dto.CategoryName.ToLower());
            if (category == null) return "Category not found.";

            using var memoryStream = new MemoryStream();
            await dto.ImageFile.CopyToAsync(memoryStream);

            var product = new Product
            {
                Name = dto.Name,
                Price = dto.Price,
                Image = memoryStream.ToArray(),
                Description = dto.Description,
                Quantity = dto.Quantity,
                CategoryId = category.CategoryId,
                VendorId = vendorId
            };

            await  _productRepository.InsertAsync(product);
            await _context.SaveChangesAsync();

            int productId = product.ProductId;

            var grant = await _context.Grants.FirstOrDefaultAsync(g => g.VendorId == vendorId);
            if (grant == null) return "Vendor has no grant.";

            var permission = await _context.Permissions.FirstOrDefaultAsync(p => p.PermissionId == grant.PermissionId);
            if (permission == null) return "Permission not found.";

            var post = new Post
            {
                ProductId = product.ProductId,
                VendorId = vendorId
            };

            if (permission.PermissionType.ToLower() == "autopost")
            {
                post.Status = true;
                _context.Posts.Add(post);
                await _context.SaveChangesAsync();
                return "Product posted with status: approved.";
            }
            else
            {
                post.Status = false;
                _context.Posts.Add(post);
                await _context.SaveChangesAsync();
                return "Product posted with status: pending.";
            }
        }

        public async Task<List<object>> GetAllProductPostsAsync()
        {
            var productPosts = await _context.Products
                .Join(_context.Posts,
                      product => product.ProductId,
                      post => post.ProductId,
                      (product, post) => new { product, post })
                .Where(joined => joined.post.Status == true)
                .Join(_context.Users,
                      combined => combined.product.VendorId,
                      user => user.UserId,
                      (combined, user) => new
                      {
                          combined.product.Name,
                          combined.product.Price,
                          combined.product.Description,
                          combined.product.Image,
                          combined.product.Quantity,
                          NumberOfViewers = combined.post.NumberOfViewers,
                          VendorName = user.Name
                      })
                .ToListAsync();

            return productPosts.Cast<object>().ToList();
        }

        public async Task<string> DeleteProductPostAsync(int productId)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return "Product not found.";

            var post = await _context.Posts.FirstOrDefaultAsync(p => p.ProductId == productId);
            if (post != null)
            {
                _context.Posts.Remove(post);
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return "Product and its post deleted successfully.";
        }

        public async Task<string> UpdateProductAsync(int productId, int vendorId, ProductDTO updatedDto)
        {
            //var product = await _context.Products
            // .Include(p => p.Category)
            //.FirstOrDefaultAsync(p => p.ProductId == productId && p.VendorId == vendorId);
            var product = await _productRepository.GetByIdAsync(productId);

            if (product == null)
                return "Product not found or access denied.";

            var originalProduct = new
            {
                product.Name,
                product.Description,
                product.Price,
                product.Quantity,
                CategoryName = product.Category?.Name,
                product.Image
            };

            bool isUpdated = false;

            if (!string.IsNullOrWhiteSpace(updatedDto.Name) && updatedDto.Name != product.Name)
            {
                product.Name = updatedDto.Name;
                isUpdated = true;
            }

            if (!string.IsNullOrWhiteSpace(updatedDto.Description) && updatedDto.Description != product.Description)
            {
                product.Description = updatedDto.Description;
                isUpdated = true;
            }

            if (updatedDto.Price > 0 && updatedDto.Price != product.Price)
            {
                product.Price = updatedDto.Price;
                isUpdated = true;
            }

            if (updatedDto.Quantity >= 0 && updatedDto.Quantity != product.Quantity)
            {
                product.Quantity = updatedDto.Quantity;
                isUpdated = true;
            }

            if (!string.IsNullOrWhiteSpace(updatedDto.CategoryName) &&
                updatedDto.CategoryName.ToLower() != originalProduct.CategoryName?.ToLower())
            {
                var category = await _context.Categories
                    .FirstOrDefaultAsync(c => c.Name.ToLower() == updatedDto.CategoryName.ToLower());

                if (category != null)
                {
                    product.CategoryId = category.CategoryId;
                }
                else
                {
                    var newCategory = new Category { Name = updatedDto.CategoryName };
                    _context.Categories.Add(newCategory);
                    await _context.SaveChangesAsync();
                    product.CategoryId = newCategory.CategoryId;
                }
                isUpdated = true;
            }

            if (updatedDto.ImageFile != null)
            {
                using var memoryStream = new MemoryStream();
                await updatedDto.ImageFile.CopyToAsync(memoryStream);
                var newImageBytes = memoryStream.ToArray();

                if (!newImageBytes.SequenceEqual(product.Image))
                {
                    product.Image = newImageBytes;
                    isUpdated = true;
                }
            }

            if (!isUpdated)
                return "No changes detected.";

            //_productRepository.UpdateAsync(product);
            //await _context.SaveChangesAsync();
            await _productRepository.UpdateAsync(product);
            return "Product updated successfully.";
        }

        public async Task<List<object>> TrackPurchasedProductAsync(string productName)
        {
            var user = _httpContextAccessor.HttpContext?.User;
            var userId = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value;


           // var product = await _productRepository.GetProductByIdAsync(productId);

            //if (product == null)
            //{
            //    return NotFound("Product not found.");
            //}

            //if (userId != product.VendorId.ToString())
            //{
            //    return Unauthorized("You are not authorized to update this product.");
            //}




            var product = await _context.Products
                .FirstOrDefaultAsync(p => p.Name.ToLower() == productName.ToLower() && p.VendorId == int.Parse( userId));

            if (product == null)
                return new List<object> { new { Error = "Product not found or access denied." } };

            var purchases = await _context.PurchaseProducts
                .Where(pp => pp.ProductId == product.ProductId)
                .Include(pp => pp.Order)
                    .ThenInclude(o => o.Customer)
                .Select(pp => new
                {
                    CustomerName = pp.Order.Customer.Name,
                    OrderDate = pp.Order.OrderDate,
                    ProductName = product.Name,
                })
                .ToListAsync<object>();

            return purchases;
        }
    }
}

