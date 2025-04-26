namespace IA_marketPlace.Models
{
    public class Post
    {
        public int PostId { get; set; }

        public int? ProductId { get; set; }

        public int? VendorId { get; set; }

        public int NumberOfViewers { get; set; }
        public bool? Status { get; set; } 

        public virtual Product? Product { get; set; }

        public virtual User? Vendor { get; set; }

        public virtual ICollection<User> Users { get; set; } = new List<User>();

        public virtual ICollection<User> UsersNavigation { get; set; } = new List<User>();
    }
}
