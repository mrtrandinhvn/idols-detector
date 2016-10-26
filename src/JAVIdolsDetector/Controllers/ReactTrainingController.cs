using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JAVIdolsDetector.Models.UIControls;
using JAVIdolsDetector.Models.Services;
using Microsoft.Extensions.Options;
using JAVIdolsDetector.Models;

namespace JAVIdolsDetector.Controllers
{
    public class ReactTrainingController : Controller
    {
        private readonly ApplicationSettings appSettings;
        private readonly IdolsDetectorContext dbContext;
        private readonly DataAccess dao;
        public ReactTrainingController(IOptions<ApplicationSettings> settings, IdolsDetectorContext dbContext)
        {
            this.appSettings = settings.Value;
            this.dbContext = dbContext;
            this.dao = new DataAccess(appSettings);
        }
        /// <summary>
        /// https://facebook.github.io/react/docs/tutorial.html
        /// </summary>
        /// <returns></returns>
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// https://facebook.github.io/react/docs/thinking-in-react.html
        /// </summary>
        /// <returns></returns>
        public IActionResult Thinking()
        {
            return View();
        }
        public IActionResult GridDemo()
        {
            return View();
        }
        [HttpPost]
        public IActionResult LoadPersonGroups(GridOptions gridOptions)
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
            return this.Json(result);
        }
    }
}
