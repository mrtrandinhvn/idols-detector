using JAVIdolsDetector.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JAVIdolsDetector.Controllers
{
    public class ApiController : Controller
    {
        private readonly ApplicationSettings _settings;

        public ApiController(IOptions<ApplicationSettings> settings)
        {
            _settings = settings.Value;
        }
    }
}
