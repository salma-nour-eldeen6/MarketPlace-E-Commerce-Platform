namespace e_commerce.Models
{
    public class Customer
    {
        public required int CustomerID { get; set; }

        public required int UserID { get; set; }
        public required User User { get; set; }

        public required ICollection<Order> Orders { get; set; }
    }

}
