using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Primitives;
using System.Collections;
using System.Collections.Generic;

namespace JAVIdolsDetector.ApiClasses
{
    public class FaceRequest : ApiRequest
    {
        const string baseUrl = @"https://api.projectoxford.ai/face/v1.0/";
        public FaceRequest(string apiKey, string action, IDictionary<string, string> queryParameters, IDictionary<string, string> bodyData) : base(apiKey, queryParameters, bodyData)
        {
            base.Uri = baseUrl + action + "?";
            base.Uri += queryParameters;
        }
    }
}
