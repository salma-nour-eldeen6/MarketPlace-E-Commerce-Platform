using IA_marketPlace.Data;
using IA_marketPlace.Repository;
using IA_marketPlace.Services;
using IA_marketPlace.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IA_marketPlace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IProductRepository _productRepository;

        public ProductController(IProductService productService, IHttpContextAccessor httpContextAccessor, IProductRepository productRepository)
        {
            _productService = productService;
            _httpContextAccessor = httpContextAccessor;
            _productRepository = productRepository;

        }

        [HttpPost("add")]
        [Authorize(Roles = "Vendor")]
        public async Task<IActionResult> AddProduct([FromForm] ProductDTO dto)
        {
            var user = _httpContextAccessor.HttpContext?.User;
            var userId = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            // Check if userId is null before parsing
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User is not authenticated.");
            }

            var result = await _productService.AddProductAsync(dto, int.Parse(userId));
            return Ok(result);
        }

        [HttpGet("posts")]
        [Authorize(Roles = "Vendor")]
        public async Task<IActionResult> GetAllProductPosts()
        {
            var result = await _productService.GetAllProductPostsAsync();
            return Ok(result);
        }

        [HttpDelete("delete/{productId}")]
        [Authorize(Roles = "Vendor")]
        public async Task<IActionResult> DeleteProduct(int productId)
        {
            var user = _httpContextAccessor.HttpContext?.User;
            var userId = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized("User not authenticated.");
            }

            var product = await _productRepository.GetProductByIdAsync(productId);
            if (product == null)
            {
                return NotFound("Product not found.");
            }
            if (userId != product.VendorId.ToString())
            {
                return Unauthorized("You are not authorized to update this product.");
            }

            var result = await _productService.DeleteProductPostAsync(productId);
            return Ok();
        }


        [HttpPut("update/{productId}")]
        [Authorize(Roles = "Vendor")]
        public async Task<IActionResult> UpdateProduct(int productId, [FromForm] ProductDTO updatedDto)
        {
            var user = _httpContextAccessor.HttpContext?.User;
            var userId = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return Unauthorized("User not authenticated.");
            }

            var product = await _productRepository.GetProductByIdAsync(productId);

            if (product == null)
            {
                return NotFound("Product not found.");
            }

            if (userId != product.VendorId.ToString())
            {
                return Unauthorized("You are not authorized to update this product.");
            }

            var result = await _productService.UpdateProductAsync(productId, (int)product.VendorId, updatedDto); // keep VendorId from DB

            return Ok(result);
        }


        [HttpGet("track/{productName}")]
        //[Authorize(Roles = "Vendor,Customer")]
        public async Task<IActionResult> TrackPurchaseProduct(string productName)
        {

            //int vendorId = 2;
            var result = await _productService.TrackPurchasedProductAsync(productName);
            return Ok(result);
        }


        // GET: api/product/browse?searchTerm=phone&category=Electronics&minPrice=100&maxPrice=1000
        [HttpGet("browse")]
        [AllowAnonymous] // Allow access without authentication
        public async Task<IActionResult> BrowseProducts([FromQuery] string? searchTerm, [FromQuery] string? category, [FromQuery] decimal? minPrice, [FromQuery] decimal? maxPrice)
        {
            var result = await _productService.BrowseProductsAsync(searchTerm, category, minPrice, maxPrice);
            return Ok(result);
        }

    }
}