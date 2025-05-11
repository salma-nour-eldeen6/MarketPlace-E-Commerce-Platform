namespace IA_marketPlace.Models
{
    public class Vendor
    {
        public int VendorId { get; set; }

        public int AdminId { get; set; }

        public bool IsApproval { get; set; }

        public virtual User Admin { get; set; } = null!;

        public virtual User VendorNavigation { get; set; } = null!;
    }
}
