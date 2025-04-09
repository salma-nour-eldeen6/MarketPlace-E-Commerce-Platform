namespace e_commerce.Models
{
    public class Category
    {
        public required int CategoryID { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }

        public required ICollection<Product> Products { get; set; }
    }

}
