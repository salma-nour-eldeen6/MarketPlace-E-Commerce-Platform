using System.ComponentModel.DataAnnotations;

namespace e_commerce.Models
{
    public class PaymentDetails
    {
        [Key]
        public int CardID { get; set; }
        public required string CardHolderName { get; set; }
        public required string CardNumber { get; set; }
        public required DateTime ExpiryDate { get; set; }

        public required int PaymentID { get; set; }
        public required Payment Payment { get; set; }
    }

}
