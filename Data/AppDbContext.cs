using e_commerce.Data;
using e_commerce.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace e_commerce.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public required DbSet<User> Users { get; set; }
        public required DbSet<Product> Products { get; set; }
        public required DbSet<Vendor> Vendors { get; set; }
        public required DbSet<Admin> Admins { get; set; }
        public required DbSet<Customer> Customers { get; set; }
        public required DbSet<Category> Categories { get; set; }
        public required DbSet<Order> Orders { get; set; }
        public required DbSet<Post> Posts { get; set; }
        public required DbSet<Permission> Permissions { get; set; }
        public required DbSet<Grant> Grants { get; set; }
        public required DbSet<Payment> Payments { get; set; }
        public required DbSet<PaymentDetails> PaymentDetails { get; set; }
        public required DbSet<PostInteraction> PostInteractions { get; set; }
        public required DbSet<Address> Addresses { get; set; }
        public required DbSet<Purchase> Purchases { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Composite key for Purchase (OrderID + ProductID)
            modelBuilder.Entity<Purchase>()
                .HasKey(p => new { p.OrderID, p.ProductID });

            // Composite key for Grant (UserID + PermissionID)
            modelBuilder.Entity<Grant>()
                .HasKey(g => new { g.UserID, g.PermissionID });

            // Composite key for PostInteraction (UserID + PostID)
            modelBuilder.Entity<PostInteraction>()
                .HasKey(pi => new { pi.UserID, pi.PostID });
        }
    }
}
