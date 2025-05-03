namespace IA_marketPlace.DTOs.Order
{
    public class OrderCreateDto
    {
        public int CustomerId { get; set; }
        public List<int> ProductIds { get; set; } = new List<int>();
    }

    public class OrderReadDto
    {
        public int OrderId { get; set; }
        public DateTime? OrderDate { get; set; }
        public int TotalPrice { get; set; }
        public int? CustomerId { get; set; }
        public List<string> ProductNames { get; set; } = new List<string>();
    }

    public class OrderUpdateDto
    {
        public int OrderId { get; set; }
        public List<int> ProductIds { get; set; } = new List<int>();
    }
}
