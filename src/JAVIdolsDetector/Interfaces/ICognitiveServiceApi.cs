using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace JAVIdolsDetector.Interfaces
{
    public interface ICognitiveServiceApi
    {
        void MakeRequest(string action);
    }
}
