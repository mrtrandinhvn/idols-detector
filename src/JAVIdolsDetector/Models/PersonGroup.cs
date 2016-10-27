using System;
using System.Collections.Generic;

namespace JAVIdolsDetector.Models
{
    public partial class PersonGroup
    {
        public PersonGroup()
        {
            Person = new HashSet<Person>();
        }

        public int PersonGroupId { get; set; }
        public string PersonGroupOnlineId { get; set; }
        public string TrainingStatus { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Person> Person { get; set; }
    }
}
