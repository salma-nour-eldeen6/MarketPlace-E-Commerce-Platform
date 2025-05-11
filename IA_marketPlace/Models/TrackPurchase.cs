namespace IA_marketPlace.Models
{
    public class TrackPurchase
    {
        public int CustomerId { get; set; }

        public int ProductId { get; set; }

        public int VendorId { get; set; }

        public virtual User Customer { get; set; } = null!;

        public virtual Product Product { get; set; } = null!;

        public virtual User Vendor { get; set; } = null!;
        public int Id { get; set; }

    }
}
