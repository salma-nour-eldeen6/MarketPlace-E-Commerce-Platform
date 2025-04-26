namespace IA_marketPlace.Models
{
    public partial class Order
    {
        //public int OrderId { get; set; }

        //public DateTime? OrderDate { get; set; }

        //public int TotalPrice { get; set; }

        //public int? CustomerId { get; set; }

        //public virtual User? Customer { get; set; }

        //public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

        //public virtual ICollection<Product> Products { get; set; } = new List<Product>();
        //// public virtual ICollection<PurchaseProducts> PurchaseProducts { get; set; } = new List<PurchaseProducts>();
        //public virtual ICollection<PurchaseProducts> PurchaseProducts { get; set; } = new List<PurchaseProducts>();
        public int OrderId { get; set; }
        public DateTime? OrderDate { get; set; }
        public int TotalPrice { get; set; }
        public int? CustomerId { get; set; }

        public virtual User? Customer { get; set; }
        public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
        public virtual ICollection<Product> Products { get; set; } = new List<Product>();
        public virtual ICollection<PurchaseProducts> PurchaseProducts { get; set; } = new List<PurchaseProducts>();



    }
}
