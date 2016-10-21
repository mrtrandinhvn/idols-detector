using System.Collections.Generic;

namespace JAVIdolsDetector.Models.UIControls
{
    public class FilterOptions
    {
        public IEnumerable<string> FilterBy { get; set; }
        public string FilterValue { get; set; }
    }
}