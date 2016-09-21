using Microsoft.Extensions.Primitives;
using System.Collections;
using System.Collections.Generic;

namespace JAVIdolsDetector.ApiClasses
{
    public class ApiRequest
    {
        public string ApiKey { get; set; }
        public string Uri { get; set; }
        public IDictionary<string, string> QueryParameters { get; set; }
        public IDictionary<string, string> Body { get; set; }
        public ApiRequest(string apiKey, IDictionary<string, string> queryParameters, IDictionary<string, string> bodyData)
        {
            this.ApiKey = apiKey;
            this.QueryParameters = queryParameters;
            this.Body = bodyData ?? new Dictionary<string, string>();
        }
    }
}
