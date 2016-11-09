using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JAVIdolsDetector.ApiClasses
{
    public class ApiResponseBody
    {
        public string Code { get; set; }
        public string Message { get; set; }
        public ApiResponseBody(string code, string message)
        {
            this.Code = code;
            this.Message = message;
        }
    }
    public class ApiResponse
    {
        public ApiResponseBody Error { get; set; }
    }
}
