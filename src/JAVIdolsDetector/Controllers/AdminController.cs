using Microsoft.AspNetCore.Mvc;
using JAVIdolsDetector.Models;
using Microsoft.Extensions.Options;
using JAVIdolsDetector.Models.Services;
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
        [HttpPost]
        public IActionResult CreatePersonGroup()
        {
            //FaceApiCaller.CreatePersonGroup(this.appSettings.ApiKey, "testgroup1", "Test Group 1");
            return this.Json(new { });
        }
        [HttpPost]
        public IActionResult DeletePersonGroup(PersonGroupServices service)
        {
            service.Delete(dbContext);
            //FaceApiCaller.DeletePersonGroup(this.appSettings.ApiKey, "testgroup1", "Test Group 1");
            return this.Json(new { });
        }
        [HttpPost]
        public IActionResult LoadPersonGroups()
        {
            return this.Json(PersonGroupServices.LoadPersonGroup(this.dbContext));
        }
        #endregion PersonGroup
    }
}
