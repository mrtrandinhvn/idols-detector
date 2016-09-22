using System;
using System.Collections.Generic;

namespace JAVIdolsDetector.Models
{
    public partial class Person
    {
        public Person()
        {
            Face = new HashSet<Face>();
        }

        public Guid PersonId { get; set; }
        public string PersonGroupId { get; set; }
        public string Name { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Alias { get; set; }
        public double? Height { get; set; }
        public string EyeColor { get; set; }
        public string HairColor { get; set; }
        public int? CountryId { get; set; }

        public virtual ICollection<Face> Face { get; set; }
        public virtual PersonGroup PersonGroup { get; set; }
    }
}
