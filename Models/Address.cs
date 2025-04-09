namespace e_commerce.Models
{
    public class Address
    {
        public int AddressID { get; set; }
        public required string AddressLine { get; set; }

        public int UserID { get; set; }
        public required User User { get; set; }
    }

}
