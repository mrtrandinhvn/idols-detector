using JAVIdolsDetector.Models.UIControls;
using System.Collections.Generic;

namespace JAVIdolsDetector.Models.Services
{
    public interface IService
    {
        IList<RequestResult> Validate();
    }
}
