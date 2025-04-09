namespace e_commerce.Models
{
    public class Post
    {
        public required int PostID { get; set; }
        public required int NumberOfViewers { get; set; }

        public required int ProductID { get; set; }
        public required Product Product { get; set; }

        public required ICollection<PostInteraction> PostInteractions { get; set; }
    }

}
