using IA_marketPlace.Models;
using IA_marketPlace.Services;
using IA_marketPlace.DTOs.Order;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IA_marketPlace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
public async Task<IActionResult> GetAll()
{
    var orders = await _orderService.GetAllOrdersAsync();
    var result = orders.Select(o => new OrderReadDto
    {
        OrderId = o.OrderId,
        OrderDate = o.OrderDate,
        TotalPrice = o.TotalPrice,
        CustomerId = o.CustomerId,
        ProductNames = o.Products.Select(p => p.Name).ToList()
    }).ToList();
    return Ok(result);
}

[HttpGet("{id}")]
public async Task<IActionResult> GetById(int id)
{
    var order = await _orderService.GetOrderByIdAsync(id);
    if (order == null) return NotFound();

    var result = new OrderReadDto
    {
        OrderId = order.OrderId,
        OrderDate = order.OrderDate,
        TotalPrice = order.TotalPrice,
        CustomerId = order.CustomerId,
        ProductNames = order.Products.Select(p => p.Name).ToList()
    };
    return Ok(result);
}

[HttpGet("customer/{customerId}")]
[Authorize(Roles = "Customer")]
public async Task<IActionResult> GetByCustomerId(int customerId)
{
    var orders = await _orderService.GetOrdersByCustomerIdAsync(customerId);
    var result = orders.Select(o => new OrderReadDto
    {
        OrderId = o.OrderId,
        OrderDate = o.OrderDate,
        TotalPrice = o.TotalPrice,
        CustomerId = o.CustomerId,
        ProductNames = o.Products.Select(p => p.Name).ToList()
    }).ToList();
    return Ok(result);
}

[HttpPost]
[Authorize(Roles = "Customer")]
public async Task<IActionResult> Add(OrderCreateDto dto)
{
    var order = new Order
    {
        OrderDate = DateTime.UtcNow,
        CustomerId = dto.CustomerId,
        Products = dto.ProductIds.Select(id => new Product { ProductId = id }).ToList()
    };

    order.TotalPrice = order.Products.Count * 100; // مثال بسيط، عدله حسب سعر المنتجات

    var result = await _orderService.AddOrderAsync(order);
    return result > 0 ? Ok("Order created") : BadRequest("Failed to create order");
}

[HttpPut("{id}")]
[Authorize(Roles = "Customer")]
public async Task<IActionResult> Update(int id, OrderUpdateDto dto)
{
    if (id != dto.OrderId) return BadRequest();

    var existingOrder = await _orderService.GetOrderByIdAsync(id);
    if (existingOrder == null) return NotFound();

    existingOrder.Products = dto.ProductIds.Select(pid => new Product { ProductId = pid }).ToList();
    existingOrder.TotalPrice = existingOrder.Products.Count * 100; // مثال للتعديل

    var result = await _orderService.UpdateOrderAsync(existingOrder);
    return result > 0 ? Ok("Order updated") : BadRequest("Update failed");
}

[HttpDelete("{id}")]
[Authorize(Roles = "Customer")]
public async Task<IActionResult> Delete(int id)
{
    var result = await _orderService.DeleteOrderAsync(id);
    return result > 0 ? Ok("Order deleted") : NotFound("Order not found");
}

    }
}
