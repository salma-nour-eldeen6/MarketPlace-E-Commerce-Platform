using Microsoft.AspNetCore.SignalR;

namespace IA_marketPlace.Services
{
    public class NotificationHub : Hub
    {
        public async Task SendVendorLoginNotification(string message)
        {
            await Clients.All.SendAsync("ReceiveVendorLoginNotification", message);
        }
    }
}


