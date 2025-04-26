namespace IA_marketPlace.Models
{
    public class Payment
    {
        public int PaymentId { get; set; }

        public DateTime? PaymentDate { get; set; }

        public string? PaymentMethod { get; set; }

        public int? OrderId { get; set; }

        public virtual Order? Order { get; set; }

        public virtual ICollection<PaymentDetail> PaymentDetails { get; set; } = new List<PaymentDetail>();
    }
}
