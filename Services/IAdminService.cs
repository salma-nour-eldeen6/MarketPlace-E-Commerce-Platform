

using IA_marketPlace.Data;

namespace IA_marketPlace
{
    public interface IAdminService
    {
        public Task<IEnumerable<VendorDto>> GetAllVendorsAsync();
        public Task ApproveVendorAsync(int vendorId, int AdminId);

        public Task RejectVendorAsync(int vendorId, int AdminId);
        public Task<IEnumerable<PostDto>> GetAllPostsAsync();
        public Task AcceptPostAsync(int postId);
        public Task RejectPostAsync(int postId);
        public Task EnableAutoPostApprovalAsync(GrantPermissionDto dto);
    }
}
