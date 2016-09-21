using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JAVIdolsDetector.Models;
using Microsoft.Extensions.Options;
using JAVIdolsDetector.Interfaces.Implementations;
using JAVIdolsDetector.ApiClasses;
using Microsoft.Extensions.Primitives;

namespace JAVIdolsDetector.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationSettings appSettings;

        public HomeController(IOptions<ApplicationSettings> settings)
        {
            appSettings = settings.Value;
        }
        public IActionResult Index()
        {
            var queryParameters = new Dictionary<string, StringValues>();
            var bodyData = new Dictionary<string, string>();
            var caller = new FaceApiCaller(new PersonGroupRequest(appSettings.ApiKey, "testGroup1", queryParameters, bodyData));
            caller.MakeRequest("CreatePersonGroup");
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
