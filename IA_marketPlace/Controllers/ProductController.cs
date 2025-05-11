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

        public ProductController(IProductService productService , IHttpContextAccessor httpContextAccessor ,IProductRepository productRepository)
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
           
            
            var userId = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                        ?? user?.FindFirst("sub")?.Value
                        ?? user?.FindFirst("id")?.Value
                        ?? user?.FindFirst("UserId")?.Value
                        ?? user?.FindFirst("username")?.Value
                        ?? user?.FindFirst(ClaimTypes.Name)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in token");
            }

            Console.WriteLine("Extracted User ID: " + userId);

            var result = await _productService.AddProductAsync(dto, int.Parse( userId));
            return Ok(result);
        }

        [HttpGet("posts")]
        [AllowAnonymous]

        public async Task<IActionResult> GetAllProductPosts()
        {
            var result = await _productService.GetAllProductPostsAsync();
            return Ok(result);
        }



        [HttpGet("ProductVendor")]
        [Authorize(Roles = "Vendor")]
        public async Task<IActionResult> GetAllProductToVendor()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            var userId = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized("User not authenticated.");
            }
            var result = await _productService.GetAllProductToVendorAsync(int.Parse(userId));
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
        [HttpGet("{productId}")]
        [Authorize]
        public async Task<IActionResult> GetProduct(int productId)
        {
            var product = await _productRepository.GetProductByIdAsync(productId);
            if (product == null) return NotFound();
            return Ok(product);
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

            var result = await _productService.UpdateProductAsync(productId, (int)product.VendorId, updatedDto); 

            return Ok(result);
        }


        [HttpGet("track/{productName}")]
        [Authorize(Roles = "Vendor")]
        public async Task<IActionResult> TrackPurchaseProduct(string productName)
        {
  
    
            var result = await _productService.TrackPurchasedProductAsync(productName);
            return Ok(result);
        }


        [HttpGet("names")]
        [Authorize(Roles = "Vendor")]
        public async Task<IActionResult> GetAllProductNames()
        {
            ;
            var user = _httpContextAccessor.HttpContext?.User;
            var userId = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized("Vendor ID not found in token.");

            var productNames = await _productRepository.GetProductsNameByVendorAsync(int.Parse(userId));
            return Ok(productNames);
        }




    }
}