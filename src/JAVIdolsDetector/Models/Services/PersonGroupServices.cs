using JAVIdolsDetector.Interfaces.Implementations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JAVIdolsDetector.Models.Services
{
    public class PersonGroupServices
    {
        public PersonGroup PersonGroup { get; set; }
        public string Mode { get; set; }
        public void AddEdit(IdolsDetectorContext dbContext)
        {
            if (this.Mode.Equals("edit", StringComparison.OrdinalIgnoreCase))
            {
                var group = dbContext.PersonGroup.Where(g => g.PersonGroupId == this.PersonGroup.PersonGroupId).FirstOrDefault();
                if (group != null)
                {
                    group.PersonGroupOnlineId = PersonGroup.PersonGroupOnlineId;
                    group.Name = PersonGroup.Name;
                }
            }
            else
            {
                this.PersonGroup.TrainingStatus = "PersonGroupNotTrained"; // default status
                dbContext.PersonGroup.Add(this.PersonGroup);
            }
            dbContext.SaveChanges();
        }
        public void Delete(IdolsDetectorContext dbContext)
        {
            dbContext.PersonGroup.Remove(this.PersonGroup);
            dbContext.SaveChanges();
        }
        public static object LoadPersonGroup(IdolsDetectorContext dbContext)
        {
            var result = new List<PersonGroup>();
            result = dbContext.PersonGroup.ToList();
            //// fake data
            //result.Add(new PersonGroup() { PersonGroupId = 1, Name = "JAV", TrainingStatus = "Ready" });
            //result.Add(new PersonGroup() { PersonGroupId = 2, TrainingStatus = "Not Ready" });
            //result.Add(new PersonGroup() { PersonGroupId = 3, TrainingStatus = "Ready" });
            //result.Add(new PersonGroup() { PersonGroupId = 4, TrainingStatus = "Not Ready" });
            //result.Add(new PersonGroup() { PersonGroupId = 5, TrainingStatus = "Not Ready" });
            //result.Add(new PersonGroup() { PersonGroupId = 6, TrainingStatus = "Ready" });
            return result;
        }
    }
}
