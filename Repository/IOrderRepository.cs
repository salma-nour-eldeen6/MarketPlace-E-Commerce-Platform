using IA_marketPlace.Models;

namespace IA_marketPlace.Repository
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        Task<IEnumerable<Order>> GetOrdersByCustomerIdAsync(int customerId);
    }
}
