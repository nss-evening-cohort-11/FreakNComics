using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using FreakNComics.Models;
using Microsoft.Data.SqlClient;


namespace FreakNComics.Data
{
    public class OrderRepository
    {
        static List<PurchaseOrder> _purchaseOrders = new List<PurchaseOrder>();

        const string _connectionString = "Server=localhost;Database=FreakNComics;Trusted_Connection=True;";

        public List<PurchaseOrder> GetPurchaseOrders()
        {
            using var db = new SqlConnection(_connectionString);

            var orders = db.Query<PurchaseOrder>("select * from PurchaseOrder");

            return orders.ToList();
        }

        public PurchaseOrder GetPurchaseOrderById(int id)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @$"select * 
                           from PurchaseOrder
                           where PurchaseOrderId = @Id";
            var parameters = new { Id = id };

            var order = db.QueryFirstOrDefault<PurchaseOrder>(query, parameters);

            return order;
        }

        public List<LineItem> GetLineItems(int id)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @$"select *
                           from LineItem
                           where PurchaseOrderId = @Id";
            var parameters = new { Id = id };

            var items = db.Query<LineItem>(query, parameters);

            return items.ToList();
        }

        public void Add(PurchaseOrder orderToAdd)
        {
            var sql = @"INSERT INTO [dbo].[PurchaseOrder]
                       ([UserId]
                       ,[InvoiceDate]
                       ,[PaymentTypeId]
                       ,[Total]
                       ,[IsComplete])
	             Output inserted.PurchaseOrderId
                 VALUES
                       (@userid, @invoicedate, @paymenttypeid, @total, @iscomplete)";

            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, orderToAdd);

            orderToAdd.PurchaseOrderId = newId;
        }

        public void AddItem(int id, LineItem itemToAdd)
        {
            itemToAdd.PurchaseOrderId = id;

            var sql = @"INSERT INTO [dbo].[LineItem]
                       ([PurchaseOrderId]
                       ,[ProductId]
                       ,[UnitPrice]
                       ,[LineItemQuantity])
	             Output inserted.LineItemId
                 VALUES
                       (@purchaseOrderId, @productId, @unitPrice, @lineItemQuantity)";

            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, itemToAdd);

            itemToAdd.LineItemId = newId;

            var getLineItems = @"select *
                                from LineItem
                                where PurchaseOrderId = @purchaseOrderId";

            var parameters = new
            {
                itemToAdd.PurchaseOrderId
            };

            var updatePurchaseOrder = db.Query<LineItem>(getLineItems, parameters).ToList();

            decimal total = 0;

            updatePurchaseOrder.ForEach((Item) => {
                total += Item.UnitPrice * Item.LineItemQuantity;
            });

            var updateOrder = @"UPDATE [dbo].[PurchaseOrder]
                                SET [Total] = @total
                                Output inserted.*
                                WHERE PurchaseOrderId = @purchaseOrderId";

            var newParams = new
            {
                total,
                itemToAdd.PurchaseOrderId
            };

            var totalPurchaseOrder = db.Query<LineItem>(updateOrder, newParams);

        }

        public PurchaseOrder Update(int id, PurchaseOrder order)
        {
            var sql = @"UPDATE [dbo].[PurchaseOrder]
                        SET [UserId] = @userid
                            ,[InvoiceDate] = @invoicedate
                            ,[PaymentTypeId] = @paymenttypeid
                            ,[Total] = @total
                        Output inserted.*
                        WHERE PurchaseOrderId = @id";

            using var db = new SqlConnection(_connectionString);

            var parameters = new
            {
                order.UserId,
                order.InvoiceDate,
                order.PaymentTypeId,
                order.Total,
                id
            };

            var updatedOrder = db.QueryFirstOrDefault(sql, parameters);

            return null;
        }

        public void Remove(int purchaseOrderId)
        {
            var sql = @"UPDATE [dbo].[PurchaseOrder]
                        SET [IsComplete] = @iscomplete
                        WHERE PurchaseOrderId = @id";
            using var db = new SqlConnection(_connectionString);

            db.QueryFirstOrDefault(sql, new { id = purchaseOrderId, iscomplete = true });

        }
    }
}
