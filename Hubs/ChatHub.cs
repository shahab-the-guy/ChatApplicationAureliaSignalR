using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace ChatApplicationAureliaSignalR.Hubs {
  public class ChatHub : Hub {
    public Task Send(string sender, string message) {

      return this.Clients.All.SendAsync("updateMessages", new { sender, message });

    }
  }
}
