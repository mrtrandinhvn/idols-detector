using System;
using System.Collections.Generic;

namespace JAVIdolsDetector.Models
{
    public partial class Face
    {
        public int FaceId { get; set; }
        public Guid FaceOnlineId { get; set; }
        public int PersonId { get; set; }
        public string ImageUrl { get; set; }

        public virtual Person Person { get; set; }
    }
}
