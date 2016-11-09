using JAVIdolsDetector.Interfaces.Implementations;
using JAVIdolsDetector.Models.UIControls;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JAVIdolsDetector.Models.Services
{
    public class PersonGroupServices
    {
        public PersonGroup PersonGroup { get; set; }
        public string Mode { get; set; }
        private IList<RequestResult> Validate()
        {
            var result = new List<RequestResult>();
            return result;
        }
        public async Task<IEnumerable<RequestResult>> AddEdit(IdolsDetectorContext dbContext, ApplicationSettings appSettings)
        {
            var errors = new List<RequestResult>();
            if (this.Mode.Equals("edit", StringComparison.OrdinalIgnoreCase))
            {
                // Edit a group
                var group = dbContext.PersonGroup.Where(g => g.PersonGroupId == this.PersonGroup.PersonGroupId).FirstOrDefault();
                if (group != null)
                {
                    group.Name = PersonGroup.Name;
                    group.TrainingStatus = PersonGroup.TrainingStatus;
                }
            }
            else
            {
                // Add new group
                var response = await FaceApiCaller.CreatePersonGroup(appSettings.ApiKey, this.PersonGroup.PersonGroupOnlineId, this.PersonGroup.Name); // call external api
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
                    this.PersonGroup.TrainingStatus = "PersonGroupNotTrained"; // default status
                    dbContext.PersonGroup.Add(this.PersonGroup);
                    dbContext.SaveChanges();
                }
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
            var response = await FaceApiCaller.DeletePersonGroup(appSettings.ApiKey, this.PersonGroup.PersonGroupOnlineId);
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
                dbContext.PersonGroup.Remove(this.PersonGroup);
                dbContext.SaveChanges();
            }
            return errors;
        }
        public static IEnumerable<PersonGroup> LoadPersonGroup(IdolsDetectorContext dbContext, int? groupId = null)
        {
            var result = new List<PersonGroup>();
            result = dbContext.PersonGroup.Where(pg => ((pg.PersonGroupId == groupId) || (groupId == null))).ToList();
            return result;
        }
    }
}
