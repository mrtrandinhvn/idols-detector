using JAVIdolsDetector.Interfaces.Implementations;
using JAVIdolsDetector.Models.UIControls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JAVIdolsDetector.Models.Services
{
    public class PersonServices : BaseService
    {
        public Person Person { get; set; }
        public string Mode { get; set; }
        public async Task<IEnumerable<RequestResult>> AddEdit(IdolsDetectorContext dbContext, ApplicationSettings appSettings)
        {
            var errors = this.Validate();
            if (this.Mode.Equals("edit", StringComparison.OrdinalIgnoreCase))
            {
                // Edit a person
                var person = dbContext.Person.Where(g => g.PersonId == this.Person.PersonId).FirstOrDefault();
                if (person != null)
                {
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
                // Add new person
                this.Person.PersonGroup = dbContext.PersonGroup.Where(pg => pg.PersonGroupId == this.Person.PersonGroupId).FirstOrDefault(); // get the Group contains this.Person
                if (this.Person.PersonGroup == null)
                {
                    errors.Add(new RequestResult() { Type = RequestResultType.error, Text = $"Can not find the Person Group with Id = {this.Person.PersonGroup}" });
                    return errors;
                }
                var response = await FaceApiCaller.CreatePerson(appSettings.ApiKey, this.Person);
                if (response != null && response.Error != null)
                {
                    errors.Add(new RequestResult()
                    {
                        Type = RequestResultType.error,
                        Text = response.Error.Message
                    });
                }
                else
                {
                    // update database
                    this.Person.PersonOnlineId = response.PersonId;
                    dbContext.Person.Add(this.Person);
                }
            }
            if (errors.Count == 0)
            {
                dbContext.SaveChanges();
            }
            return errors;
        }
        public async Task<IEnumerable<RequestResult>> Delete(IdolsDetectorContext dbContext, ApplicationSettings appSettings)
        {
            var errors = this.Validate();
            if (errors.Count > 0)
            {
                return errors;
            }
            this.Person.PersonGroup = dbContext.PersonGroup.Where(pg => pg.PersonGroupId == this.Person.PersonGroupId).FirstOrDefault(); // get the Group contains this.Person
            if (this.Person.PersonGroup == null)
            {
                errors.Add(new RequestResult() { Type = RequestResultType.error, Text = $"Can not find the Person Group with Id = {this.Person.PersonGroup}" });
                return errors;
            }
            var response = await FaceApiCaller.DeletePerson(appSettings.ApiKey, this.Person);
            if (response != null && response.Error != null)
            {
                errors.Add(new RequestResult()
                {
                    Type = RequestResultType.error,
                    Text = response.Error.Message
                });
            }
            else
            {
                dbContext.Person.Remove(this.Person);
                dbContext.SaveChanges();
            }
            return errors;
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
