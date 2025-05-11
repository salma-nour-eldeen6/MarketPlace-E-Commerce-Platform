namespace IA_marketPlace.Data
{
    public class ProductDTO
    {
        public int ProductId { get; set; }
        public string Name { get; set; } = null!;
        public decimal? Price { get; set; }
        public IFormFile ImageFile { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int? Quantity { get; set; }
  
        public string CategoryName { get; set; } = null!;
        public string? ImageUrl { get; set; }      
        public int? NumberOfViewers { get; set; }  
        public string? VendorName { get; set; }

    }
}
