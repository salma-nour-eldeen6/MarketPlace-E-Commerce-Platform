namespace IA_marketPlace.Models
{
    public class PurchaseProducts
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public Order Order { get; set; }
        public Product Product { get; set; }
    }
}
