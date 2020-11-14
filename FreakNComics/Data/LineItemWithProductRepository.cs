using Dapper;
using FreakNComics.Models;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FreakNComics.Data
{
    public class LineItemWithProductRepository
    {
        const string _connectionString = "Server=localhost;Database=FreakNComics;Trusted_Connection=True;";
        public IEnumerable<LineItemWithProduct> GetLineItemsWithProduct(int orderId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @$"select *
                           from LineItem
                           join Product
                           on LineItem.ProductId = Product.ProductId
                           where PurchaseOrderId = @Id";
            var parameters = new { Id = orderId };

            var items = db.Query<LineItemWithProduct>(query, parameters);

            return items;
        }

    }
}
