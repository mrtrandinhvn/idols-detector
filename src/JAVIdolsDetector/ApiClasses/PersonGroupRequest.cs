using Microsoft.Extensions.Primitives;
using System.Collections.Generic;

namespace JAVIdolsDetector.ApiClasses
{
    public class PersonGroupRequest : ApiRequest
    {
        const string baseUrl = @"https://api.projectoxford.ai/face/v1.0/persongroups/";
        public PersonGroupRequest(string apiKey, string groupId, IDictionary<string, string> queryParameters, IDictionary<string, string> bodyData) : base(apiKey, queryParameters, bodyData)
        {
            base.Uri = baseUrl + groupId + "?";
            base.Uri += queryParameters;
        }
    }
}
