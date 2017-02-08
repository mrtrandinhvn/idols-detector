using JAVIdolsDetector.ApiClasses;
using JAVIdolsDetector.Models;
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
        public static async Task<ApiResponse> CreatePersonGroup(string apiKey, PersonGroup group)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", apiKey);
                var uri = $@"https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/{group.PersonGroupOnlineId}";
                var byteData = Encoding.UTF8.GetBytes(string.Format("{{'name': '{0}'}}", group.Name));
                using (var content = new ByteArrayContent(byteData))
                {
                    content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                    return await new RequestHelper().Send(client, RequestType.PUT, uri, content);
                }
            }
        }
        public static async Task<ApiResponse> DeletePersonGroup(string apiKey, PersonGroup group)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", apiKey);
                var uri = $@"https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/{group.PersonGroupOnlineId}";
                return await new RequestHelper().Send(client, RequestType.DELETE, uri, null);
            }
        }
        #endregion PersonGroup
        #region PersonGroup
        public static async Task<ApiResponse> CreatePerson(string apiKey, Person person)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", apiKey);
                var uri = $@"https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/{person.PersonGroup.PersonGroupOnlineId}/persons";
                var byteData = Encoding.UTF8.GetBytes(string.Format("{{'name': '{0}'}}", person.Name));
                using (var content = new ByteArrayContent(byteData))
                {
                    content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                    return await new RequestHelper().Send(client, RequestType.POST, uri, content);
                }
            }
        }
        public static async Task<ApiResponse> DeletePerson(string apiKey, Person person)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", apiKey);
                var uri = $@"https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/{person.PersonGroup.PersonGroupOnlineId}/persons/{person.PersonOnlineId}";
                return await new RequestHelper().Send(client, RequestType.DELETE, uri, null);
            }
        }
        #endregion PersonGroup
    }
}
