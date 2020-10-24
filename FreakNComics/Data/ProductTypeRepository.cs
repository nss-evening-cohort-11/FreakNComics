using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using FreakNComics.Models;
using Dapper;

namespace FreakNComics.Data
{
    public class ProductTypeRepository
    {
        static List<ProductType> _productType = new List<ProductType>();

        const string _connectionString = "Server=localhost;Database=FreakNComics;Trusted_Connection=True;";

        public void Add(ProductType typeToAdd)
        {
            var sql = @"INSERT INTO [dbo].[ProductType]
                                ([Category])
                                Output inserted.ProductTypeId
                            VALUES
                                (@category)";

            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, typeToAdd);

            typeToAdd.ProductypeId = newId;
        }

        public List<ProductType> GetAll()
        {
            using var db = new SqlConnection(_connectionString);
            var productType = db.Query<ProductType>("select * from producttype");

            return productType.ToList();
        }

        public ProductType GetById(int productTypeId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select *
                            from ProductType 
                            where ProductTypeId = @ptid";

            var parameters = new { ptid = productTypeId };

            var productTypes = db.QueryFirstOrDefault<ProductType>(query, parameters);

            return productTypes;
        }
    }
}
