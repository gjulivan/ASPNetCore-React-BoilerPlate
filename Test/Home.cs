using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using System.Threading.Tasks;
using System.Net.Http;
using Web;
using Xunit;

namespace Test
{
    public class Home
    {
        private readonly TestServer _server;
        private readonly HttpClient _client;
        public Home()
        {

            _server = new TestServer(new WebHostBuilder().UseStartup<Startup>());
            _client = _server.CreateClient();
        }

        [Fact]
        public async Task Index()
        {

        }
    }
}
