using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JAVIdolsDetector.ApiClasses
{
    public class ApiErrorResponseBody
    {
        public string Code { get; set; }
        public string Message { get; set; }
        public ApiErrorResponseBody(string code, string message)
        {
            this.Code = code;
            this.Message = message;
        }
    }
    public class ApiResponse
    {
        public ApiErrorResponseBody Error { get; set; }
        /// <summary>
        /// For successful CreatePerson request
        /// </summary>
        public Guid PersonId { get; set; }
    }
}
