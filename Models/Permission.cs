namespace e_commerce.Models
{
    public class Permission
    {
        public required int PermissionID { get; set; }
        public required string Status { get; set; }
        public required string PermissionType { get; set; }

        public required ICollection<Grant> Grants { get; set; }
    }

}
