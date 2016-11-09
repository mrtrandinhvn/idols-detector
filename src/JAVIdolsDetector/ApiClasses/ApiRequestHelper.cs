using JAVIdolsDetector.ApiClasses;
using JAVIdolsDetector.Models.UIControls;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace JAVIdolsDetector.Interfaces.Implementations
{
    public class RequestHelper : IRequestHelper
    {
        /// <summary>
        /// Main implementation of the IRequestHelper interface
        /// </summary>
        /// <param name="client"></param>
        /// <param name="type"></param>
        /// <param name="uri"></param>
        /// <param name="content"></param>
        /// <returns></returns>
        public async Task<ApiResponse> Send(HttpClient client, RequestType type, string uri, ByteArrayContent content)
        {
            HttpResponseMessage response;
            try
            {
                switch (type)
                {
                    case RequestType.DELETE:
                        response = await client.DeleteAsync(uri);
                        break;
                    case RequestType.PUT:
                        content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                        response = await client.PutAsync(uri, content);
                        break;
                    case RequestType.POST:
                        response = await client.PostAsync(uri, content);
                        break;
                    case RequestType.GET:
                    default:
                        response = await client.GetAsync(uri);
                        break;
                }
            }
            catch (HttpRequestException)
            {
                return new ApiResponse { Error = new ApiResponseBody("NoConnection", "Can not establish a connection to Microsft's server, please check your internet connection and try again.") };
            }
            var responseBody = JsonConvert.DeserializeObject<ApiResponse>(await response.Content.ReadAsStringAsync());
            return responseBody;
        }
    }
}
