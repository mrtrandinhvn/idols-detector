using JAVIdolsDetector.Models.UIControls;
using System.Collections.Generic;

namespace JAVIdolsDetector.Models.Services
{
    public abstract class BaseService
    {
        /// <summary>
        /// default Validate method
        /// </summary>
        /// <returns></returns>
        protected virtual IList<RequestResult> Validate()
        {
            var result = new List<RequestResult>();
            return result;
        }
    }
}
