using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace JAVIdolsDetector.Models.UIControls
{
    public class RequestResult
    {
        [JsonConverter(typeof(StringEnumConverter))]
        public RequestResultType Type { get; set; }
        public string Text { get; set; }
        public RequestResult()
        {
            this.Type = RequestResultType.success;
            this.Text = "success";
        }
    }
}
