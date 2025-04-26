using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Numerics;
using System.Security;
using Microsoft.EntityFrameworkCore.SqlServer;
using IA_marketPlace.Models;

namespace  IA_marketPlace.Data;

public partial class MarketplaceContext : DbContext
{
    public MarketplaceContext()
    {
    }

    public MarketplaceContext(DbContextOptions<MarketplaceContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }
    public virtual DbSet<Grant> Grants { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<PaymentDetail> PaymentDetails { get; set; }

    public virtual DbSet<Permission> Permissions { get; set; }

    public virtual DbSet<Post> Posts { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<TrackPurchase> TrackPurchases { get; set; }
    public virtual DbSet<PurchaseProducts> PurchaseProducts { get; set; }

    public virtual DbSet<RefreshToken> RefreshTokens { get; set; }
    //public virtual DbSet<TokenResponse> TokenResponses { get; set; }


    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Vendor> Vendors { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Data Source=DESKTOP-3R2HVDJ\\SQLEXPRESS;Initial Catalog=marketplace;Integrated Security=True;TrustServerCertificate=True;User Id=sa;Password=1234");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__Category__19093A2BA9026DAA");

            entity.ToTable("Category");

            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<Grant>(entity =>
        {
            entity.HasKey(e => new { e.AdminId, e.VendorId, e.PermissionId }).HasName("PK__Grants__50B8239E1E06ED35");

            entity.Property(e => e.AdminId).HasColumnName("AdminID");
            entity.Property(e => e.VendorId).HasColumnName("VendorID");
            entity.Property(e => e.PermissionId).HasColumnName("PermissionID");

            entity.HasOne(d => d.Admin).WithMany(p => p.GrantAdmins)
                .HasForeignKey(d => d.AdminId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Grants__AdminID__403A8C7D");

            entity.HasOne(d => d.Permission).WithMany(p => p.Grants)
                .HasForeignKey(d => d.PermissionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Grants__Permissi__4222D4EF");

            entity.HasOne(d => d.Vendor).WithMany(p => p.GrantVendors)
                .HasForeignKey(d => d.VendorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Grants__VendorID__412EB0B6");
        });

        //modelBuilder.Entity<Order>(entity =>
        //{
        //    entity.HasKey(e => e.OrderId).HasName("PK__Orders__C3905BAF7414D3C9");

        //    entity.Property(e => e.OrderId).HasColumnName("OrderID");
        //    entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
        //    entity.Property(e => e.OrderDate).HasColumnType("datetime");

        //    entity.HasOne(d => d.Customer).WithMany(p => p.Orders)
        //        .HasForeignKey(d => d.CustomerId)
        //        .HasConstraintName("FK__Orders__Customer__4AB81AF0");

        //    entity.HasMany(d => d.Products).WithMany(p => p.Orders)
        //        .UsingEntity<Dictionary<string, object>>(
        //            "PurchaseProduct",
        //            r => r.HasOne<Product>().WithMany()
        //                .HasForeignKey("ProductId")
        //                .OnDelete(DeleteBehavior.ClientSetNull)
        //                .HasConstraintName("FK__PurchaseP__Produ__4E88ABD4"),
        //            l => l.HasOne<Order>().WithMany()
        //                .HasForeignKey("OrderId")
        //                .OnDelete(DeleteBehavior.ClientSetNull)
        //                .HasConstraintName("FK__PurchaseP__Order__4D94879B"),
        //            j =>
        //            {
        //                j.HasKey("OrderId", "ProductId").HasName("PK__Purchase__08D097C1F272D29F");
        //                j.ToTable("PurchaseProducts");
        //                j.IndexerProperty<int>("OrderId").HasColumnName("OrderID");
        //                j.IndexerProperty<int>("ProductId").HasColumnName("ProductID");
        //            });
        //});




        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PK__Payment__9B556A5895CB4674");

            entity.ToTable("Payment");

            entity.Property(e => e.PaymentId).HasColumnName("PaymentID");
            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.PaymentDate).HasColumnType("datetime");
            entity.Property(e => e.PaymentMethod).HasMaxLength(50);

            entity.HasOne(d => d.Order).WithMany(p => p.Payments)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__Payment__OrderID__5165187F");
        });


        modelBuilder.Entity<PaymentDetail>(entity =>
        {
            entity.HasKey(e => e.CardId).HasName("PK__PaymentD__55FECD8E5B7DA406");

            entity.Property(e => e.CardId)
                .ValueGeneratedNever()
                .HasColumnName("CardID");
            entity.Property(e => e.CardHolderName).HasMaxLength(100);
            entity.Property(e => e.CardNumber).HasMaxLength(20);
            entity.Property(e => e.PaymentId).HasColumnName("PaymentID");

            entity.HasOne(d => d.Payment).WithMany(p => p.PaymentDetails)
                .HasForeignKey(d => d.PaymentId)
                .HasConstraintName("FK__PaymentDe__Payme__5441852A");
        });

        modelBuilder.Entity<Permission>(entity =>
        {
            entity.HasKey(e => e.PermissionId).HasName("PK__Permissi__EFA6FB0F4D431A7C");

            entity.ToTable("Permission");

            entity.Property(e => e.PermissionId).HasColumnName("PermissionID");
            entity.Property(e => e.PermissionType).HasMaxLength(100);
        });

        modelBuilder.Entity<Post>(entity =>
        {
            entity.HasKey(e => e.PostId).HasName("PK__Post__AA126038F07D338E");

            entity.ToTable("Post");

            entity.Property(e => e.PostId).HasColumnName("PostID");
            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.VendorId).HasColumnName("VendorID");

            entity.HasOne(d => d.Product).WithMany(p => p.Posts)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK__Post__ProductID__5FB337D6");

            entity.HasOne(d => d.Vendor).WithMany(p => p.PostsNavigation)
                .HasForeignKey(d => d.VendorId)
                .HasConstraintName("FK__Post__VendorID__60A75C0F");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK__Product__B40CC6EDA7DC29B9");

            entity.ToTable("Product");

            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.VendorId).HasColumnName("VendorID");

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__Product__Categor__46E78A0C");

            entity.HasOne(d => d.Vendor).WithMany(p => p.ProductsNavigation)
                .HasForeignKey(d => d.VendorId)
                .HasConstraintName("FK__Product__VendorI__47DBAE45");
        });

        modelBuilder.Entity<TrackPurchase>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.VendorId).HasColumnName("VendorID");

            // Product FK
            entity.HasOne(e => e.Product)
                .WithMany(p => p.TrackPurchases)
                .HasForeignKey(e => e.ProductId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_TrackPurchase_Product");

            // Vendor FK -> User
            entity.HasOne(e => e.Vendor)
                .WithMany() // or .WithMany(u => u.SoldPurchases)
                .HasForeignKey(e => e.VendorId)
                .OnDelete(DeleteBehavior.NoAction)
                .HasConstraintName("FK_TrackPurchase_Vendor");

            // Customer FK -> User
            entity.HasOne(e => e.Customer)
                .WithMany() // or .WithMany(u => u.BoughtPurchases)
                .HasForeignKey(e => e.CustomerId)
                .OnDelete(DeleteBehavior.NoAction)
                .HasConstraintName("FK_TrackPurchase_Customer");
        });




        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CCAC366E5C17");

            entity.HasIndex(e => e.Email, "UQ__Users__A9D105341CF5B7ED").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Address).HasMaxLength(20);
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Password).HasMaxLength(255);
            entity.Property(e => e.Phone).HasMaxLength(20);
            entity.Property(e => e.Role).HasMaxLength(50);

            entity.HasMany(d => d.Posts).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "FavoritePost",
                    r => r.HasOne<Post>().WithMany()
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__FavoriteP__PostI__68487DD7"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__FavoriteP__UserI__6754599E"),
                    j =>
                    {
                        j.HasKey("UserId", "PostId").HasName("PK__Favorite__8D29EAAFC4D4EA2D");
                        j.ToTable("FavoritePosts");
                        j.IndexerProperty<int>("UserId").HasColumnName("UserID");
                        j.IndexerProperty<int>("PostId").HasColumnName("PostID");
                    });

            entity.HasMany(d => d.Posts1).WithMany(p => p.UsersNavigation)
                .UsingEntity<Dictionary<string, object>>(
                    "PostInteraction",
                    r => r.HasOne<Post>().WithMany()
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__PostInter__PostI__6477ECF3"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__PostInter__UserI__6383C8BA"),
                    j =>
                    {
                        j.HasKey("UserId", "PostId").HasName("PK__PostInte__8D29EAAFD0526AA7");
                        j.ToTable("PostInteraction");
                        j.IndexerProperty<int>("UserId").HasColumnName("UserID");
                        j.IndexerProperty<int>("PostId").HasColumnName("PostID");
                    });

            entity.HasMany(d => d.Products).WithMany(p => p.Customers)
                .UsingEntity<Dictionary<string, object>>(
                    "CustomarProduct",
                    r => r.HasOne<Product>().WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__CustomarP__Produ__5812160E"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__CustomarP__Custo__571DF1D5"),
                    j =>
                    {
                        j.HasKey("CustomerId", "ProductId").HasName("PK__Customar__6FEEA8D6C01D0FE9");
                        j.ToTable("CustomarProduct");
                        j.IndexerProperty<int>("CustomerId").HasColumnName("CustomerID");
                        j.IndexerProperty<int>("ProductId").HasColumnName("ProductID");
                    });
        });

        modelBuilder.Entity<Vendor>(entity =>
        {
            entity.HasKey(e => new { e.VendorId, e.AdminId }).HasName("PK__Vendor__6B9FE69DE40512A3");

            entity.ToTable("Vendor");

            entity.Property(e => e.VendorId).HasColumnName("VendorID");
            entity.Property(e => e.AdminId).HasColumnName("AdminID");
            entity.Property(e => e.IsApproval).HasColumnName("isApproval");

            entity.HasOne(d => d.Admin).WithMany(p => p.VendorAdmins)
                .HasForeignKey(d => d.AdminId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Vendor__AdminID__3B75D760");

            entity.HasOne(d => d.VendorNavigation).WithMany(p => p.VendorVendorNavigations)
                .HasForeignKey(d => d.VendorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Vendor__VendorID__3A81B327");
        });

        //modelBuilder.Entity<Order>(entity =>
        //{
        //    entity.HasKey(e => e.OrderId);
        //    // ... other configurations

        //    // Replace the entire UsingEntity block with:
        //    entity.HasMany(d => d.Products)
        //        .WithMany(p => p.Orders)
        //        .UsingEntity<Dictionary<string, object>>(
        //            "PurchaseProducts",
        //            r => r.HasOne<Product>().WithMany()
        //                .HasForeignKey("ProductId"),
        //            l => l.HasOne<Order>().WithMany()
        //                .HasForeignKey("OrderId"),
        //            j => j.HasKey("OrderId", "ProductId"));
        //});
        modelBuilder.Entity<TrackPurchase>(entity =>
        {
            entity.ToTable("TrackPurchase"); // Explicitly set table name

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id).HasColumnName("Id");
            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.VendorId).HasColumnName("VendorID");

            entity.HasOne(e => e.Product)
                .WithMany(p => p.TrackPurchases)
                .HasForeignKey(e => e.ProductId);

            entity.HasOne(e => e.Vendor)
                .WithMany()
                .HasForeignKey(e => e.VendorId);

            entity.HasOne(e => e.Customer)
                .WithMany()
                .HasForeignKey(e => e.CustomerId);
        });
        
   modelBuilder.Entity<PurchaseProducts>(entity =>
   {
       // Define composite primary key
       entity.HasKey(e => new { e.OrderId, e.ProductId });

       entity.Property(e => e.OrderId).HasColumnName("OrderID");
       entity.Property(e => e.ProductId).HasColumnName("ProductID");

       // Configure relationships
       entity.HasOne(e => e.Order)
           .WithMany(o => o.PurchaseProducts)
           .HasForeignKey(e => e.OrderId)
           .OnDelete(DeleteBehavior.Cascade);

       entity.HasOne(e => e.Product)
           .WithMany(p => p.PurchaseProducts)
           .HasForeignKey(e => e.ProductId)
           .OnDelete(DeleteBehavior.Cascade);
   });
        modelBuilder.Entity<RefreshToken>()
      .HasOne(rt => rt.User)
      .WithMany(u => u.RefreshTokens)
      .HasForeignKey(rt => rt.UserId)
      .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<TokenResponse>()
           .HasOne(rt => rt.User)
           .WithMany(u => u.TokenResponses)
           .HasForeignKey(rt => rt.UserId);

        OnModelCreatingPartial(modelBuilder);
    }
    



    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
