using Microsoft.AspNetCore.Mvc;
using JAVIdolsDetector.Models;
using Microsoft.Extensions.Options;
using JAVIdolsDetector.Interfaces.Implementations;

namespace JAVIdolsDetector.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationSettings appSettings;
        private readonly IdolsDetectorContext dbContext;
        public HomeController(IOptions<ApplicationSettings> settings, IdolsDetectorContext dbContext)
        {
            appSettings = settings.Value;
            this.dbContext = dbContext;
        }
        public IActionResult Index()
        {
            //FaceApiCaller.CreatePersonGroup(this.appSettings.ApiKey, "testgroup1", "Test Group 1");
            //FaceApiCaller.DeletePersonGroup(this.appSettings.ApiKey, "testgroup1");
            return View();
        }
        public IActionResult Thinking()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
