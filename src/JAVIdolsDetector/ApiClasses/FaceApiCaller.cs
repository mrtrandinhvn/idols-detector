using JAVIdolsDetector.Models.DataAccess;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

namespace JAVIdolsDetector.Interfaces.Implementations
{
    public class FaceApiCaller
    {
        #region PersonGroup
        public static async void CreatePersonGroup(string apiKey, string groupId, string groupName)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", apiKey);
                var uri = $@"https://api.projectoxford.ai/face/v1.0/persongroups/{groupId}";
                var byteData = Encoding.UTF8.GetBytes(string.Format("{{'name': '{0}'}}", groupName));
                using (var content = new ByteArrayContent(byteData))
                {
                    content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                    HttpResponseMessage response;
                    response = await client.PutAsync(uri, content);
                    if (response.IsSuccessStatusCode)
                    {
                        new PersonGroupDataAccess().AddEditPersonGroup();
                    }
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
                    // display error message
                }
            }
        }
        #endregion PersonGroup
    }
}
