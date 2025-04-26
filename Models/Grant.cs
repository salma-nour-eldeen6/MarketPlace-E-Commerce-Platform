using System.Security;
using System;
using System.Collections.Generic;

namespace IA_marketPlace.Models
{
    public class Grant
    {

        public int AdminId { get; set; }

        public int VendorId { get; set; }

        public int PermissionId { get; set; }

        public bool? Status { get; set; }

        public virtual User Admin { get; set; } = null!;

        public virtual Permission Permission { get; set; } = null!;

        public virtual User Vendor { get; set; } = null!;
    }
}
