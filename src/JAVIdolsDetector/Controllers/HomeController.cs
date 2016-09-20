using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JAVIdolsDetector.Models;
using Microsoft.Extensions.Options;

namespace JAVIdolsDetector.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationSettings _settings;

        public HomeController(IOptions<ApplicationSettings> settings)
        {
            _settings = settings.Value;
        }
        public IActionResult Index()
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
