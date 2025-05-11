using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.SignalR;

namespace IA_marketPlace.Services
{
    [EnableCors("AllowAll")]
    public class NotificationHub : Hub
    {
        public override async Task OnConnectedAsync()
        {

            await Groups.AddToGroupAsync(Context.ConnectionId, "Customers");
            await base.OnConnectedAsync();
            Console.WriteLine($"Client connected: {Context.ConnectionId}, added to Customers group.");
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "Customers");
            await base.OnDisconnectedAsync(exception);
            Console.WriteLine($"Client disconnected: {Context.ConnectionId}, removed from Customers group.");
        }

    }
}


