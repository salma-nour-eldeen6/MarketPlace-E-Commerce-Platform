namespace e_commerce.Models
{
    public class Payment
    {
        public required int PaymentID { get; set; }
        public required string Status { get; set; }
        public required DateTime PaymentDate { get; set; }

        public required PaymentDetails PaymentDetails { get; set; }
    }

}
