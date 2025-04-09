namespace e_commerce.Models
{
    public class Vendor
    {
        public int VendorID { get; set; }
        public required string BankAccount { get; set; }

        public int UserID { get; set; }
        public required User User { get; set; }
    }
}
