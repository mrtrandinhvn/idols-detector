using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using System.Text;
using Microsoft.AspNetCore.WebUtilities;
using JAVIdolsDetector.ApiClasses;

namespace JAVIdolsDetector.Interfaces.Implementations
{
    public class FaceApiCaller : IFaceApi
    {
        private ApiRequest request;
        private HttpClient client;
        public FaceApiCaller(ApiRequest request)
        {
            this.request = request;
        }
        private string GetRequestType(string action)
        {
            string result;
            switch (action.ToLower())
            {
                case "createpersongroup":
                case "createpersonface":
                    result = "PUT";
                    break;
                default:
                    result = "POST";
                    break;
            }
            return result;
        }
        public async void MakeRequest(string action)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", this.request.ApiKey);
                var queryString = QueryHelpers.ParseQuery(string.Empty);
                var content = new FormUrlEncodedContent(request.Body);
                content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                HttpResponseMessage response;
                switch (this.GetRequestType(action))
                {
                    case "PUT":
                        response = await client.PutAsync(this.request.Uri, content);
                        break;
                }
            }
        }
    }
}
