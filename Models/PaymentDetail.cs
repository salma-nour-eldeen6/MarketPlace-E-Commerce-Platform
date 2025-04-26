namespace IA_marketPlace.Models
{
    public class PaymentDetail
    {
        public int CardId { get; set; }

        public int? PaymentId { get; set; }

        public string CardHolderName { get; set; } = null!;

        public string CardNumber { get; set; } = null!;

        public DateOnly? ExpiryDate { get; set; }

        public virtual Payment? Payment { get; set; }
    }
}
