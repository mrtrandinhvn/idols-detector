using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JAVIdolsDetector.ApiClasses
{
    public class ErrorResponse
    {
        public string Code { get; set; }
        public string Message { get; set; }
    }
    public class ApiResponse
    {
        public ErrorResponse Error { get; set; }
    }
}
