using JAVIdolsDetector.Models.UIControls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JAVIdolsDetector.Models
{
    /// <summary>
    /// Contains loader for dropdownlists
    /// </summary>
    public class Lookups
    {
        public static IEnumerable<DropDownListOption> GetPersonGroups(IdolsDetectorContext dbContext)
        {
            var result = new List<DropDownListOption>();
            result = dbContext.PersonGroup.Select(pg => new DropDownListOption { Label = pg.Name, Value = Convert.ToString(pg.PersonGroupId) }).ToList();
            return result;
        }
        public static IEnumerable<DropDownListOption> GetPeople(IdolsDetectorContext dbContext)
        {
            var result = new List<DropDownListOption>();
            result = dbContext.Person.Select(p => new DropDownListOption { Label = p.Name, Value = Convert.ToString(p.PersonId) }).ToList();
            return result;
        }
    }
}
