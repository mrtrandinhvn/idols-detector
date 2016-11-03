using JAVIdolsDetector.ApiClasses;
using JAVIdolsDetector.Models.UIControls;
using Newtonsoft.Json;
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
        public static async Task<IList<RequestResult>> CreatePersonGroup(string apiKey, string groupId, string groupName)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", apiKey);
                var uri = $@"https://api.projectoxford.ai/face/v1.0/persongroups/{groupId}";
                var byteData = Encoding.UTF8.GetBytes(string.Format("{{'name': '{0}'}}", groupName));
                using (var content = new ByteArrayContent(byteData))
                {
                    content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                    var response = await client.PutAsync(uri, content);
                    if (response.IsSuccessStatusCode)
                    {
                        return new List<RequestResult>();
                    }
                    var errors = new List<RequestResult>();
                    var responseBody = JsonConvert.DeserializeObject<ApiResponse>(await response.Content.ReadAsStringAsync());
                    if (responseBody != null)
                    {
                        errors.Add(new RequestResult()
                        {
                            Type = RequestResultType.error,
                            Text = responseBody.Error.Message
                        });
                    }
                    return errors;
                }
            }
        }
        public static async void DeletePersonGroup(string apiKey, string groupId)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", apiKey);
                var uri = $@"https://api.projectoxford.ai/face/v1.0/persongroups/{groupId}";
                HttpResponseMessage response;
                response = await client.DeleteAsync(uri);
                if (response.IsSuccessStatusCode)
                {
                    // update database
                }
                else
                {
                    // notify error message
                }
            }
        }
        #endregion PersonGroup
    }
}
