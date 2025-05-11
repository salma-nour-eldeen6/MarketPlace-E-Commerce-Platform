namespace IA_marketPlace.Models
{
    public class Product
    {
        public int ProductId { get; set; }

        public string Name { get; set; } = null!;

        public decimal Price { get; set; }

        public string Image { get; set; } = null!;

        public string Description { get; set; } = null!;

        public int Quantity { get; set; }

        public int? CategoryId { get; set; }

        public int? VendorId { get; set; }

        public virtual Category? Category { get; set; }

        public virtual ICollection<Post> Posts { get; set; } = new List<Post>();

        public virtual ICollection<TrackPurchase> TrackPurchases { get; set; } = new List<TrackPurchase>();

        public virtual User? Vendor { get; set; }

        public virtual ICollection<User> Customers { get; set; } = new List<User>();

        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
        public virtual ICollection<PurchaseProducts> PurchaseProducts { get; set; } = new List<PurchaseProducts>();


       


    }
}
