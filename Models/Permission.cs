namespace IA_marketPlace.Models
{
    public class Permission
    {
        public int PermissionId { get; set; }

        public string PermissionType { get; set; } = null!;

        public virtual ICollection<Grant> Grants { get; set; } = new List<Grant>();
    }
}
