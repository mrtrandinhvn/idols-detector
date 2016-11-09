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
    public class FaceApiCaller
    {
        #region PersonGroup
        public static async Task<ApiResponse> CreatePersonGroup(string apiKey, string groupId, string groupName)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", apiKey);
                var uri = $@"https://api.projectoxford.ai/face/v1.0/persongroups/{groupId}";
                var byteData = Encoding.UTF8.GetBytes(string.Format("{{'name': '{0}'}}", groupName));
                using (var content = new ByteArrayContent(byteData))
                {
                    content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                    return await new RequestHelper().Send(client, RequestType.PUT, uri, content);
                }
            }
        }
        public static async Task<ApiResponse> DeletePersonGroup(string apiKey, string groupId)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", apiKey);
                var uri = $@"https://api.projectoxford.ai/face/v1.0/persongroups/{groupId}";
                return await new RequestHelper().Send(client, RequestType.DELETE, uri, null);
            }
            #endregion PersonGroup
        }
    }
}
