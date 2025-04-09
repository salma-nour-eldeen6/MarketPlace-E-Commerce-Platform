namespace e_commerce.Models
{
    public class Grant
    {
        public required int UserID { get; set; }
        public required User User { get; set; }

        public required int PermissionID { get; set; }
        public required Permission Permission { get; set; }

        public required bool CanMake { get; set; }
        public required bool CanPost { get; set; }
        public required bool CanManage { get; set; }
    }

}
