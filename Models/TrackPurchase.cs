namespace IA_marketPlace.Models
{
    public class TrackPurchase
    {
        public int Id { get; set; }

        [ForeignKey("Customer")]
        public int CustomerId { get; set; }

        [ForeignKey("Vendor")]
        public int VendorId { get; set; }

        [ForeignKey("Product")]
        public int ProductId { get; set; }

        public virtual User Customer { get; set; } = null!;

        public virtual Product Product { get; set; } = null!;

        public virtual User Vendor { get; set; } = null!;

    }
}
