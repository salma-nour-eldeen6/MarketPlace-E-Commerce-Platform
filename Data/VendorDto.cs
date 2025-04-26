using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Components.Web;

namespace IA_marketPlace.Data
{
    public class VendorDto
    {
        public int UserId { get; set; }

        public string? Name { get; set; }

        public string Email { get; set; } = null!;

        public string? Phone { get; set; }

        public string? Address { get; set; }

       
    }
}
