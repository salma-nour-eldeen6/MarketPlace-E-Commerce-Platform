using IA_marketPlace.Data;
using IA_marketPlace.Models;
using IA_marketPlace.Repository;
using Microsoft.AspNetCore.SignalR;
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
        private readonly IHubContext<NotificationHub> _hubContext;

        public ProductService(MarketplaceContext context, IProductRepository productRepository, IHttpContextAccessor httpContextAccessor, IHubContext<NotificationHub> hubContext)
        {
            _context = context;
            _productRepository = productRepository;
            _httpContextAccessor = httpContextAccessor;
            _hubContext = hubContext;
        }

       
        public async Task<string> AddProductAsync(ProductDTO dto, int vendorId)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Name.ToLower() == dto.CategoryName.ToLower());
            if (category == null) return "Category not found.";

          
            var vendor = await _context.Vendors.FirstOrDefaultAsync(v => v.VendorId == vendorId);
            if (vendor == null) return "Vendor not found.";

            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == vendor.VendorId);
            if (user == null) return "Vendor user not found.";

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "product_images");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.ImageFile.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.ImageFile.CopyToAsync(stream);
            }

            var imageUrl = Path.Combine("uploads", "product_images", fileName).Replace("\\", "/");

            var product = new Product
            {
                Name = dto.Name,
                Price = (decimal)dto.Price,
                Image = imageUrl,
                Description = dto.Description,
                Quantity = (int)dto.Quantity,
                CategoryId = category.CategoryId,
                VendorId = vendorId
            };

            await _productRepository.InsertAsync(product);
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

            if (permission.PermissionType.ToLower() == "autopost"  && grant.Status == true)
            {
                post.Status = true;
                _context.Posts.Add(post);
                await _context.SaveChangesAsync();

                
                await _hubContext.Clients.Group("Customers").SendAsync("NewProductAdded", new
                {
                    Message = $"New product added: {product.Name}",
                    Product = new
                    {
                        product.ProductId,
                        product.Name,
                        product.Price,
                        Image = imageUrl,
                        product.Description,
                        product.Quantity,
                        Category = category.Name,
                        VendorName = user.Name 
                    }
                });

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



        public async Task<List<ProductDTO>> GetAllProductPostsAsync()
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
                (combined, user) => new ProductDTO
                {
                    ProductId = combined.product.ProductId,
                    Name = combined.product.Name,
                    Price = combined.product.Price,
                    Description = combined.product.Description,
                    Quantity = combined.product.Quantity,
                    ImageUrl = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}/{combined.product.Image}",
                    NumberOfViewers = combined.post.NumberOfViewers,
                    VendorName = user.Name,
                   
                })
                .ToListAsync();

            return productPosts;
        }



        public async Task<List<object>> GetAllProductToVendorAsync(int userId)
        {
            var productPosts = await _context.Products
                .Where(p => p.VendorId == userId)
                .Join(_context.Posts,
                      product => product.ProductId,
                      post => post.ProductId,
                      (product, post) => new
                      {
                          product.ProductId,
                          product.Name,
                          product.Price,
                          product.Quantity,
                          post.Status,
                         
                          ImageUrl = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}/" + product.Image

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
                product.Price = (decimal)updatedDto.Price;
                isUpdated = true;
            }

            if (updatedDto.Quantity >= 0 && updatedDto.Quantity != product.Quantity)
            {
                product.Quantity = (int)updatedDto.Quantity;
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
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "product_images");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(updatedDto.ImageFile.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await updatedDto.ImageFile.CopyToAsync(stream);
                }

                var imageUrl = Path.Combine("uploads", "product_images", fileName).Replace("\\", "/");

                if (product.Image != imageUrl)
                {
                    product.Image = imageUrl;
                    isUpdated = true;
                }
            }

            if (!isUpdated)
                return "No changes detected.";

            await _productRepository.UpdateAsync(product);
            return "Product updated successfully.";
        }

        public async Task<List<object>> TrackPurchasedProductAsync(string productName)
        {
            var user = _httpContextAccessor.HttpContext?.User;
            var userId = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value;


            var product = await _context.Products
                .FirstOrDefaultAsync(p => p.Name.ToLower() == productName.ToLower() && p.VendorId == int.Parse(userId));

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
                    ProductName = pp.Product.Name, 
                    totalprice = pp.Order.TotalPrice,
                })
                .ToListAsync<object>();

            return purchases;
        }
    }
}

