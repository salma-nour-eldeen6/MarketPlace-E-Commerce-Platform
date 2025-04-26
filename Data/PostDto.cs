using System.ComponentModel.DataAnnotations;

namespace IA_marketPlace.Data
{
    public class PostDto
    {
        public int PostId { get; set; }
        public int ProductId { get; set; }
        public int VendorId { get; set; }
        public string ProductName { get; set; } = null!;
        public bool Status { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
