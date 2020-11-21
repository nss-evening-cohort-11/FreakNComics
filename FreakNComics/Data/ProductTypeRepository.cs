using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using FreakNComics.Models;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace FreakNComics.Data
{
    public class ProductTypeRepository
    {
        readonly string _connectionString;

        public ProductTypeRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("FreakNComics");
        }

        public void Add(ProductType typeToAdd)
        {
            var sql = @"INSERT INTO [dbo].[ProductType]
                                ([Category])
                                Output inserted.ProductTypeId
                            VALUES
                                (@category)";

            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, typeToAdd);

            typeToAdd.ProductTypeId = newId;
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
