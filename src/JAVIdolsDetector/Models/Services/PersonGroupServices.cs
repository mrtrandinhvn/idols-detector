using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JAVIdolsDetector.Models.Services
{
    public class PersonGroupServices
    {
        public PersonGroup PersonGroup { get; set; }
        public void AddEdit(IdolsDetectorContext dbContext)
        {
        }
        public void Delete(IdolsDetectorContext dbContext)
        {
            dbContext.PersonGroup.Remove(this.PersonGroup);
            dbContext.SaveChanges();
        }
        public static object LoadPersonGroup(IdolsDetectorContext dbContext)
        {
            var result = new List<PersonGroup>();
            //result = dbContext.PersonGroup.ToList();
            //// fake data
            result.Add(new PersonGroup() { PersonGroupId = 1, TrainingStatus = "Ready" });
            result.Add(new PersonGroup() { PersonGroupId = 2, TrainingStatus = "Not Ready" });
            result.Add(new PersonGroup() { PersonGroupId = 3, TrainingStatus = "Ready" });
            result.Add(new PersonGroup() { PersonGroupId = 4, TrainingStatus = "Not Ready" });
            result.Add(new PersonGroup() { PersonGroupId = 5, TrainingStatus = "Not Ready" });
            result.Add(new PersonGroup() { PersonGroupId = 6, TrainingStatus = "Ready" });
            return result;
        }
    }
}
