using Microsoft.AspNetCore.Mvc;
using JAVIdolsDetector.Models;
using Microsoft.Extensions.Options;
using JAVIdolsDetector.Models.Services;
using JAVIdolsDetector.Models.UIControls;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;

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
        [HttpPost, HttpGet]
        public IActionResult LoadPersonGroups(GridOptions gridOptions, int? groupId)
        {
            return this.Json(PersonGroupServices.LoadPersonGroup(this.dbContext, groupId));
        }
        [HttpPost]
        public async Task<IActionResult> DeletePersonGroup(PersonGroupServices form)
        {
            return this.Json(new { messages = await form.Delete(dbContext, this.appSettings) });
        }

        [HttpPost]
        public async Task<IActionResult> SavePersonGroup(PersonGroupServices form)
        {
            return this.Json(new { messages = await form.AddEdit(this.dbContext, this.appSettings) });
        }
        #endregion PersonGroup
        #region Person
        [HttpPost]
        public IActionResult SavePerson(PersonServices form)
        {
            form.AddEdit(this.dbContext);
            if (!form.Mode.Equals("edit", StringComparison.OrdinalIgnoreCase))
            {
                //FaceApiCaller.CreatePersonGroup(this.appSettings.ApiKey, form.PersonGroup.PersonGroupOnlineId, form.PersonGroup.Name);
            }
            return this.Json(new { });
        }
        public IActionResult PersonList()
        {
            return View();
        }
        public IActionResult LoadPeople(GridOptions gridOptions, int? groupId, int? personId)
        {
            return this.Json(PersonServices.LoadPeople(this.dbContext));
        }
        public IActionResult DeletePerson(PersonServices form)
        {
            form.Delete(dbContext);
            return this.Json(new { });
        }
        #endregion Person
        #region Face
        [HttpPost]
        public IActionResult SaveFace(FaceServices form)
        {
            form.AddEdit(this.dbContext);
            if (!form.Mode.Equals("edit", StringComparison.OrdinalIgnoreCase))
            {
                // call API
            }
            return this.Json(new { });
        }
        public IActionResult FaceList()
        {
            return View();
        }
        public IActionResult LoadFaces(GridOptions gridOptions, int? groupId, int? FaceId)
        {
            return this.Json(FaceServices.LoadFaces(this.dbContext));
        }
        public IActionResult DeleteFace(FaceServices form)
        {
            form.Delete(dbContext);
            // Call API
            return this.Json(new { });
        }
        #endregion Face
        #region Commons
        [HttpPost]
        public IActionResult PersonGroupDDL()
        {
            return Json(Lookups.GetPersonGroups(this.dbContext));
        }
        public IActionResult PersonDDL()
        {
            return Json(Lookups.GetPeople(this.dbContext));
        }
        #endregion
    }
}
