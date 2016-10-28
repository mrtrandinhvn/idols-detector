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
        public static IEnumerable<PersonGroup> LoadPersonGroup(IdolsDetectorContext dbContext, int? groupId = null)
        {
            var result = new List<PersonGroup>();
            result = dbContext.PersonGroup.Where(pg => ((pg.PersonGroupId == groupId) || (groupId == null))).ToList();
            return result;
        }
    }
}
