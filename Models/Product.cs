using Microsoft.Extensions.Hosting;

namespace e_commerce.Models
{
    public class Product
    {
        public required int ProductID { get; set; }
        public required string Name { get; set; }
        public required decimal Price { get; set; }
        public required string Image { get; set; }

        public required int CategoryID { get; set; }
        public required Category Category { get; set; }

        public required ICollection<Post> Posts { get; set; }
        public required ICollection<Purchase> Purchases { get; set; }
    }

}
