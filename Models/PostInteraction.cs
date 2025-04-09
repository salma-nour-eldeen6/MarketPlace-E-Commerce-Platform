namespace e_commerce.Models
{
    public class PostInteraction
    {
        public int UserID { get; set; }
        public required User User { get; set; }

        public int PostID { get; set; }
        public required Post Post { get; set; }

        public bool Viewed { get; set; }
        public bool Saved { get; set; }
    }

}
