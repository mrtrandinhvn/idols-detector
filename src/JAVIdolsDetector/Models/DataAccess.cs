using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace JAVIdolsDetector.Models
{
    public class DataAccess
    {
        private SqlConnection connection;
        public DataAccess(ApplicationSettings appSettings)
        {
            this.connection = new SqlConnection(appSettings.ConnectionString);
        }
    }
}
