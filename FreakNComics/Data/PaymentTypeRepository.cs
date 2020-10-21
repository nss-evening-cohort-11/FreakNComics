using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using FreakNComics.Models;
namespace FreakNComics.Data
{
    public class PaymentTypeRepository
    {
        static List<PaymentType> _PaymentType = new List<PaymentType>();

        const string _connectionString = "Server=localhost;Database=FreakNComics;Trusted_Connection=True;";
    }
}
