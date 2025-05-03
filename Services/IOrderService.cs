using IA_marketPlace.Models;

namespace IA_marketPlace.Services
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetAllOrdersAsync();
        Task<Order?> GetOrderByIdAsync(int id);
        Task<IEnumerable<Order>> GetOrdersByCustomerIdAsync(int customerId);
        Task<int> AddOrderAsync(Order order);
        Task<int> UpdateOrderAsync(Order order);
        Task<int> DeleteOrderAsync(int id);
    }
}
