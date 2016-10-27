using Microsoft.AspNetCore.Mvc;
using JAVIdolsDetector.Models;
using Microsoft.Extensions.Options;
using JAVIdolsDetector.Models.Services;
using JAVIdolsDetector.Models.UIControls;
using JAVIdolsDetector.Interfaces.Implementations;
using System;

namespace JAVIdolsDetector.Controllers
{
    public class AdminController : Controller
    {
        private readonly ApplicationSettings appSettings;
        private readonly IdolsDetectorContext dbContext;
        private readonly DataAccess dao;
        public AdminController(IOptions<ApplicationSettings> settings, IdolsDetectorContext dbContext)
        {
            this.appSettings = settings.Value;
            this.dbContext = dbContext;
            this.dao = new DataAccess(appSettings);
        }
        [HttpGet]
        public IActionResult Index()
        {
            return View(PersonGroupServices.LoadPersonGroup(this.dbContext));
        }
        #region PersonGroup
        [HttpGet]
        public IActionResult PersonGroupList()
        {
            return View(PersonGroupServices.LoadPersonGroup(this.dbContext));
        }
        [HttpPost]
        public IActionResult LoadPersonGroups(GridOptions gridOptions)
        {
            return this.Json(PersonGroupServices.LoadPersonGroup(this.dbContext));
        }
        [HttpPost]
        public IActionResult DeletePersonGroup(PersonGroupServices form)
        {
            form.Delete(dbContext);
            FaceApiCaller.DeletePersonGroup(this.appSettings.ApiKey, form.PersonGroup.PersonGroupOnlineId);
            return this.Json(new { });
        }

        [HttpPost]
        public IActionResult SavePersonGroup(PersonGroupServices form)
        {
            form.AddEdit(this.dbContext);
            if (!form.Mode.Equals("edit", StringComparison.OrdinalIgnoreCase))
            {
                FaceApiCaller.CreatePersonGroup(this.appSettings.ApiKey, form.PersonGroup.PersonGroupOnlineId, form.PersonGroup.Name);
            }
            return this.Json(new { });
        }
        #endregion PersonGroup
    }
}
