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
            var sql = @"INSERT INTO [dbo].[Product]
                               ([ProductTypeId]
                               ,[Title]
                               ,[Description]
                               ,[Quantity]
                               ,[Price]
                               ,[imageUrl]
                               ,[inStock])
                               Output inserted.ProductId
                            VALUES
                                (@productTypeId,@title,@description,@quantity,@price,@imageUrl,@inStock)";

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
        public List<Products> GetLatestProducts()
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select TOP 20 * 
                            from Product
                            where ProductId = @pid
                            order by ProductId desc";

            var products = db.Query<Products>(query).ToList();

            return products;
        }
        public Products Update(int id, Products products)
        {
            var sql = @"UPDATE [dbo].[Product]
                            SET [ProductTypeId] = @productTypeId
                               ,[Title] = @title
                               ,[Description] = @description
                               ,[Quantity] = @quantity
                               ,[Price] = @price
                               ,[imageUrl] = @imageUrl
                               ,[inStock] = @inStock
                            output inserted.*
                            WHERE ProductId = @productId";
            using var db = new SqlConnection(_connectionString);


            var parameters = new
            {
                ProductTypeId = products.ProductTypeId,
                Title = products.Title,
                Description = products.Description,
                Quantity = products.Quantity,
                Price = products.Price,
                imageUrl = products.imageUrl,
                inStock = products.inStock,
                ProductId = id
            };

            var updatedProducts = db.QueryFirstOrDefault<Products>(sql, parameters);

            return updatedProducts;

        }

        public void Remove(int productsId)
        {
            var sql = @"DELETE
                        FROM [dbo].[Product]
                        WHERE ProductId = @productid";

            using var db = new SqlConnection(_connectionString);

            db.Execute(sql, new { productid = productsId });
        }



    }
}
