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

        public PurchaseOrder GetActivePurchaseOrderByUserId(int userId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select *
                            from PurchaseOrder
                            where UserId = @uid 
                            AND IsComplete = 0";
            var parameters = new { uid = userId };

            var activeOrder = db.QueryFirstOrDefault<PurchaseOrder>(query, parameters);

            return activeOrder;
        }

        public IEnumerable<LineItem> GetLineItems(int orderId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @$"select *
                           from LineItem
                           where PurchaseOrderId = @Id";
            var parameters = new { Id = orderId };

            var items = db.Query<LineItem>(query, parameters);

            return items;
        }

        public LineItem GetLineItemById(int purchaseOrderId, int id)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @$"select * 
                           from LineItem
                           where LineItemId = @Id and PurchaseOrderId = @PurchaseOrderId";
            var parameters = new {
                Id = id,
                PurchaseOrderId = purchaseOrderId
            };

            var item = db.QueryFirstOrDefault<LineItem>(query, parameters);

            return item;
        }

        public PurchaseOrder Add(PurchaseOrder orderToAdd)
        {
            var sql = @"INSERT INTO [dbo].[PurchaseOrder]
                       ([UserId]
                       ,[InvoiceDate]
                       ,[Total]
                       ,[IsComplete])
	             Output inserted.PurchaseOrderId
                 VALUES
                       (@userid, @invoicedate, @total, @iscomplete)";

            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, orderToAdd);

            orderToAdd.PurchaseOrderId = newId;
            return orderToAdd;
        }

        // ADD LINE ITEM TO PO
        public void AddItem(int orderId, LineItem itemToAdd)
        {
            itemToAdd.PurchaseOrderId = orderId;

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

            UpdatePurchaseOrderTotal(orderId, updatePurchaseOrder);
        }

        // UPDATE TOTAL ON PO
        public void UpdatePurchaseOrderTotal(int purchaseOrderId, List<LineItem> lineItemsOnOrder)
        {
            using var db = new SqlConnection(_connectionString);

            decimal total = 0;
            lineItemsOnOrder.ForEach((Item) => {
                total += Item.UnitPrice * Item.LineItemQuantity;
            });

            var query = @"UPDATE [dbo].[PurchaseOrder]
                                SET [Total] = @total
                                Output inserted.*
                                WHERE PurchaseOrderId = @purchaseOrderId";

            var parameters = new
            {
                total,
                purchaseOrderId
            };

            var updatedPurchaseOrderTotal = db.Query<LineItem>(query, parameters);
        }

        public LineItem UpdateLineItem(int id, int itemId, LineItem item)
        {
            var sql = @"UPDATE [dbo].[LineItem]
                       SET [ProductId] = @productId
                          ,[UnitPrice] = @unitPrice
                          ,[LineItemQuantity] = @lineItemQuantity
                       WHERE PurchaseOrderId = @Id and LineItemId = @ItemId";

            var param = new
            {
                item.ProductId,
                item.UnitPrice,
                item.LineItemQuantity,
                Id = id,
                ItemId = itemId
            };

            using var db = new SqlConnection(_connectionString);

            var updatedLineItem = db.QueryFirstOrDefault(sql, param);

            return null;
        }

        // UPDATE QUANTITY ON LINE ITEM
        public int IncreaseLineItemQuantity(int lineItemId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"UPDATE [dbo].[LineItem]
                           SET [LineItemQuantity] = LineItemQuantity + 1
                           output inserted.LineItemQuantity
                           WHERE LineItemId = @id";

            var parameters = new
            {
                // todo: change the quantity incrementer to a variable
                id = lineItemId
            };

            var updatedQuantity = db.QueryFirstOrDefault<int>(query, parameters);

            return updatedQuantity;
        }

        public PurchaseOrder Update(int id, PurchaseOrder order)
        {
            var sql = @"UPDATE [dbo].[PurchaseOrder]
                        SET [UserId] = @userid
                            ,[InvoiceDate] = @invoicedate
                            ,[Total] = @total
                        Output inserted.*
                        WHERE PurchaseOrderId = @id";

            using var db = new SqlConnection(_connectionString);

            var parameters = new
            {
                order.UserId,
                order.InvoiceDate,
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

        public bool RemoveLineItem(int id, int itemId)
        {
            var check = @"select *
                          from PurchaseOrder
                          where PurchaseOrderId = @Id";

            using var db = new SqlConnection(_connectionString);

            var param = new
            {
                Id = id,
            };

            var completionCheck = db.Query<PurchaseOrder>(check, param);

            if (completionCheck.FirstOrDefault().IsComplete == true) return true;

            var sql = @"DELETE FROM [dbo].[LineItem]
                        WHERE LineItemId = @ItemId and PurchaseOrderId = @Id";


            db.QueryFirstOrDefault(sql, new { Id = id, ItemId = itemId });

            return false;
        }
    }
}
