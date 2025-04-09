namespace e_commerce.Models
{
    public class Admin
    {
        public required int AdminID { get; set; }

        public required int UserID { get; set; }
        public required User User { get; set; }
    }

}
