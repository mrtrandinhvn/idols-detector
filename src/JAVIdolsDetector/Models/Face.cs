using System;
using System.Collections.Generic;

namespace JAVIdolsDetector.Models
{
    public partial class Face
    {
        public Guid FaceId { get; set; }
        public Guid PersonId { get; set; }
        public string ImageUrl { get; set; }

        public virtual Person Person { get; set; }
    }
}
