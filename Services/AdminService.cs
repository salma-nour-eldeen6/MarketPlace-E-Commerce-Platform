
using IA_marketPlace.Data;
using IA_marketPlace.Models;
using IA_marketPlace.Repository;
using Microsoft.EntityFrameworkCore;

namespace IA_marketPlace.Repository
{
    public class AdminService(IVendorRepository _vendorRepository,IAdminRepository _adminRepository, 
        IPostRepository _postRepository, IGrantRepository _grantRepository, IPermissionRepository _permissionRepository) : IAdminService
    {
        public async Task<IEnumerable<VendorDto>> GetAllVendorsAsync()
        {
            var Vendores = await _adminRepository.GetAllAsync();
            var VendorsRole = Vendores.Where(v => v.Role == "Vendor");
            var VendorDto = VendorsRole.Select(v => new VendorDto
            {
                UserId = v.UserId,
                Name = v.Name,
                Email = v.Email,
                Phone = v.Phone,
                Address = v.Address,               
            });
            return VendorDto;
        }

        public async Task ApproveVendorAsync(int vendorId, int AdminId)
        {
            var Vendor = await _vendorRepository.GetByCompositeIdAsync(vendorId, AdminId);
            if (Vendor is not null)
            {
                Vendor.IsApproval = true;
                await _vendorRepository.UpdateAsync(Vendor);
            }
        }

        public async Task RejectVendorAsync(int vendorId, int AdminId)
        {
            var Vendor = await _vendorRepository.GetByCompositeIdAsync(vendorId, AdminId);
            if (Vendor is not null)
            {
                Vendor.IsApproval = false;
                await _vendorRepository.UpdateAsync(Vendor);
            }
        }

        public async Task<IEnumerable<PostDto>> GetAllPostsAsync()
        {
            var Posts = await _postRepository.GetAllAsync(p => p.Include(p => p.Product).Include(p => p.Vendor));
            var PostsDto = Posts.Select(p => new PostDto
            {
                PostId = p.PostId,
                VendorId = p.Vendor?.UserId ?? 0,
                ProductId = p.Product?.ProductId ?? 0,
                ProductName = p.Product?.Name ?? "",
                Status = (bool)p.Status,
                Quantity = p.Product?.Quantity ?? 0,
                Price = p.Product?.Price ?? 0,
            });
            return PostsDto;
        }

        public async Task AcceptPostAsync(int postId)
        {
            var Post = await _postRepository.GetByIdAsync(postId);
            if (Post != null)
            {
                Post.Status = true;
                await _postRepository.UpdateAsync(Post);
            }
        }


        public async Task RejectPostAsync(int postId)
        {
            var Post = await _postRepository.GetByIdAsync(postId);
            if (Post != null)
            {
                Post.Status = false;
                await _postRepository.UpdateAsync(Post);
            }
        }


        public async Task EnableAutoPostApprovalAsync(GrantPermissionDto dto)
        {
            var grantDto = new Grant
            {
                AdminId = dto.AdminId,
                VendorId = dto.VendorId,
                PermissionId = dto.PermissionId
            };

            var grant = await _grantRepository.GetGrant(grantDto);

            if (grant is not null)
            {
                var permission = await _permissionRepository.GetByIdAsync(grant.PermissionId);

                if (permission is not null)
                {
                    permission.PermissionType = "AutoPost";
                    grant.Status = true;
                    await _permissionRepository.UpdateAsync(permission);
                    await _grantRepository.UpdateAsync(grant);
                }
            }

        }

    }
}
