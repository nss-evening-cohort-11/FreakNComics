using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using FreakNComics.Models;
using Dapper;

namespace FreakNComics.Data
{
    public class ProductsRepository
    {

        static List<Products> _products = new List<Products>();

        const string _connectionString = "Server=localhost;Database=FreakNComics;Trusted_Connection=True;";

        public void Add(Products productToAdd)
        {
            var sql = @"INSERT INTO [dbo].[Products]
                               ,[ProductTypeId]
                               ,[Title]
                               ,[Description]
                               ,[Quantity]
                               ,[Price]
                               ,[imageUrl]
                               ,[inStock])
                               Output inserted.id
                            VALUES
                                (@productTypeId,@title,@desc,@qty,@price,@imgurl,@instock)";

            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, productToAdd);

            productToAdd.ProductId = newId;
        }

        public List<Products> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            var product = db.Query<Products>("select * from product");

            return product.ToList();
        }

        public Products GetById(int productId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select *
                          from Product
                          where ProductId = @pid";

            var parameters = new { pid = productId };

            var products = db.QueryFirstOrDefault<Products>(query, parameters);

            return products;
        }



    }
}
