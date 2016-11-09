using System.Net.Http;
using System.Threading.Tasks;

namespace JAVIdolsDetector.ApiClasses
{
    public interface IRequestHelper
    {
        Task<ApiResponse> Send(HttpClient client, RequestType type, string uri, ByteArrayContent content);
    }
}
