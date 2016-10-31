using JAVIdolsDetector.Interfaces.Implementations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JAVIdolsDetector.Models.Services
{
    public class PersonServices
    {
        public Person Person { get; set; }
        public string Mode { get; set; }
        public void AddEdit(IdolsDetectorContext dbContext)
        {
            if (this.Mode.Equals("edit", StringComparison.OrdinalIgnoreCase))
            {
                var person = dbContext.Person.Where(g => g.PersonId == this.Person.PersonId).FirstOrDefault();
                if (person != null)
                {
                    person.PersonOnlineId = Person.PersonOnlineId;
                    person.Name = Person.Name;
                    person.Alias = Person.Alias;
                    person.BirthDate = Person.BirthDate;
                    person.Height = Person.Height;
                    person.EyeColor = Person.EyeColor;
                    person.HairColor = Person.HairColor;
                }
            }
            else
            {
                this.Person.PersonOnlineId = Guid.NewGuid();
                dbContext.Person.Add(this.Person);
            }
            dbContext.SaveChanges();
        }
        public void Delete(IdolsDetectorContext dbContext)
        {
            dbContext.Person.Remove(this.Person);
            dbContext.SaveChanges();
        }
        public static IEnumerable<Person> LoadPeople(IdolsDetectorContext dbContext, int? personId = null, int? personGroupId = null)
        {
            var result = new List<Person>();
            result = dbContext.Person.Where(p => (
                (p.PersonId == personId) || (personId == null) && (personGroupId == null || p.PersonGroupId == personGroupId)
            )).ToList();
            return result;
        }
    }
}
