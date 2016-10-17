using System;
using System.Collections.Generic;

namespace JAVIdolsDetector.Models
{
    public partial class Country
    {
        public Country()
        {
            Person = new HashSet<Person>();
        }

        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public string Isocode { get; set; }

        public virtual ICollection<Person> Person { get; set; }
    }
}
