using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace JAVIdolsDetector.Controllers
{
    public class ReactTraining : Controller
    {
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
    }
}
