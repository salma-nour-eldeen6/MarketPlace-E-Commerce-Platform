//using ECommerce.Data;
//using ECommerce.DTOS;
//using ECommerce.Models;
//using ECommerce.Repositories.Interfaces;
//using ECommerce.Services.Interfaces;
using IA_marketPlace;
using IA_marketPlace.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace IA_marketPlace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin")]

    public class AdminController(IAdminService _adminService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> GetAllVendors()
        {
            var Vendors = await _adminService.GetAllPendingVendorsAsync();
            return Ok(Vendors);
        }

        [HttpPut("accept-vendor{vendorId}-{AdminId}")]
        public async Task<ActionResult> ApproveVendor(int vendorId, int AdminId)
        {
            await _adminService.ApproveVendorAsync(vendorId, AdminId);
            return Ok("Vendor Accepted");
        }

        [HttpPut("reject-vendor{vendorId}")]
        public async Task<ActionResult> RejectVendor(int vendorId, int AdminId)
        {
            await _adminService.RejectVendorAsync(vendorId, AdminId);
            return Ok("Vendor Rejevted");
        }

        [HttpGet("posts")]
        public async Task<ActionResult> GetAllPosts()
        {
            var PendingVendors = await _adminService.GetAllPendingPostsAsync();
            return Ok(PendingVendors);
        }

        [HttpPut("accept-post{postId}")]
        public async Task<ActionResult> AcceptPost(int postId)
        {
            await _adminService.AcceptPostAsync(postId);
            return Ok("Post Accepted");
        }
        [HttpPut("reject-post{postId}")]
        public async Task<ActionResult> RejectPostAsync(int postId)
        {
            await _adminService.RejectPostAsync(postId);
            return Ok("Post Rejected");
        }
       


        [HttpPut("EnableAutoPost")]
        public async Task<ActionResult> EnableAutoPostApproval(GrantPermissionDto dto)
        {
            await _adminService.EnableAutoPostApprovalAsync(dto);
            return Ok("Vendor Can Post Without Admin Accet");
        }
        
    }
}
