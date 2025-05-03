using IA_marketPlace.Models;
using IA_marketPlace.Repository;
using Microsoft.EntityFrameworkCore;

namespace IA_marketPlace.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IGenericRepository<TrackPurchase> _trackRepo;
        private readonly IProductRepository _productRepository;

        public OrderService(IOrderRepository orderRepository,IGenericRepository<TrackPurchase> trackRepo,IProductRepository productRepository) // ✅ Add this
        {
            _orderRepository = orderRepository;
            _trackRepo = trackRepo;
            _productRepository = productRepository; // ✅ And this
        }



        public async Task<IEnumerable<Order>> GetAllOrdersAsync()
        {
            return await _orderRepository.GetAllAsync(q => q
                .Include(o => o.Products));
        }

        public async Task<Order?> GetOrderByIdAsync(int id)
        {
            return await _orderRepository.GetAllAsync(q => q
                .Include(o => o.Products)
                .Where(o => o.OrderId == id)).ContinueWith(t => t.Result.FirstOrDefault());
        }

        public async Task<IEnumerable<Order>> GetOrdersByCustomerIdAsync(int customerId)
        {
            return await _orderRepository.GetOrdersByCustomerIdAsync(customerId);
        }

        public async Task<int> AddOrderAsync(Order order)
        {
            decimal totalPrice = 0;

            if (order.Products.Any())
            {
                var fullProducts = new List<Product>();

                foreach (var product in order.Products)
                {
                    var productEntity = await _productRepository.GetProductByIdAsync(product.ProductId);
                    if (productEntity == null) continue;

                    totalPrice += productEntity.Price; // ✅ اجمع السعر
                    fullProducts.Add(productEntity);
                }

                order.Products = fullProducts; // ✅ اربط المنتجات الفعلية
                order.TotalPrice = (int)totalPrice; // ✅ احفظ السعر في الطلب
            }

            var result = await _orderRepository.InsertAsync(order);

            if (result > 0 && order.Products.Any())
            {
                foreach (var product in order.Products)
                {
                    var track = new TrackPurchase
                    {
                        CustomerId = order.CustomerId ?? 0,
                        VendorId = (int)product.VendorId,
                        ProductId = product.ProductId
                    };

                    await _trackRepo.InsertAsync(track);
                }
            }

            return result;
        }



        public async Task<int> UpdateOrderAsync(Order order)
        {
            return await _orderRepository.UpdateAsync(order);
        }

        public async Task<int> DeleteOrderAsync(int id)
        {
            return await _orderRepository.DeleteAsync(id);
        }
    }
}
