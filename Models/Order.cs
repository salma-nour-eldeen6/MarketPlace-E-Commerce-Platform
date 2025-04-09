namespace e_commerce.Models
{
    public class Order
    {
        public required int OrderID { get; set; }
        public required decimal TotalAmount { get; set; }
        public required string Status { get; set; }
        public required DateTime OrderDate { get; set; }

        public required int CustomerID { get; set; }
        public required Customer Customer { get; set; }

        public required ICollection<Purchase> Purchases { get; set; }
    }

}
