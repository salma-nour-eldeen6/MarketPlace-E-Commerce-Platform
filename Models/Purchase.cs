namespace e_commerce.Models
{
    public class Purchase
    {
        public required int OrderID { get; set; }
        public required Order Order { get; set; }

        public required int ProductID { get; set; }
        public required Product Product { get; set; }
    }

}
