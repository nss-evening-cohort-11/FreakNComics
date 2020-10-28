using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FreakNComics.Models;
using FreakNComics.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Net.Http;

namespace FreakNComics.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        OrderRepository _repo;
        public OrderController()
        {
            _repo = new OrderRepository();
        }

        [HttpPost]
        public IActionResult CreatePurchaseOrder(PurchaseOrder order)
        {
            _repo.Add(order);

            return Created($"/api/orders/{order.PurchaseOrderId}", order);
        }

        [HttpGet]
        public IActionResult GetAllOrders()
        {
            var allOrders = _repo.GetPurchaseOrders();

            return Ok(allOrders);
        }

        [HttpGet("{id}")]
        public IActionResult GetOrderById(int id)
        {
            var order = _repo.GetPurchaseOrderById(id);

            if (order == null) return NotFound();

            return Ok(order);
        }

        [HttpGet("{id}/items")]
        public IActionResult GetOrderItems(int id)
        {
            var items = _repo.GetLineItems(id);

            if (items == null) return NotFound();

            return Ok(items);
        }

        [HttpGet("{id}/items/{itemId}")]
        public IActionResult GetSingleItem(int id, int itemId)
        {
            var item = _repo.GetLineItemById(id, itemId);

            if (item == null) return NotFound();

            return Ok(item);
        }

        [HttpPut("{id}/items/{itemId}")]
        public IActionResult UpdateSingleItem(int id, int itemId, LineItem item)
        {
            if (_repo.GetLineItemById(id, itemId) == null) return NotFound();

            var updatedLineItem = _repo.UpdateLineItem(id, itemId, item);

            return Ok(updatedLineItem);
        }

        [HttpDelete("{id}/items/{itemId}")]
        public IActionResult DeleteLineItem(int id, int itemId)
        {
            if (_repo.GetLineItemById(id, itemId) == null)
            {
                return NotFound();
            }

            var isComplete = _repo.RemoveLineItem(id, itemId);
            
            if (isComplete == true)
            {
                return Unauthorized("Order is already completed");
            }

            return Ok();
        }

        [HttpPost("{id}/items")]
        public IActionResult CreateLineItem(int id, LineItem item)
        {
            var items = _repo.GetLineItems(id).ToArray();

            for (int i = 0; i < items.Count(); i++)
            {
                if (items[i].ProductId == item.ProductId)
                    {
                    return Unauthorized("Product already in cart");
                    }
            }

            _repo.AddItem(id, item);

            return Created($"/api/orders/{id}/items/{item.LineItemId}", item);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateOrder(int id, PurchaseOrder purchaseOrder)
        {
            if (_repo.GetPurchaseOrderById(id) == null)
            {
                return NotFound();
            }

            var updatedOrder = _repo.Update(id, purchaseOrder);

            return Ok(updatedOrder);

        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            if(_repo.GetPurchaseOrderById(id) == null)
            {
                return NotFound();
            }

            _repo.Remove(id);

            return Ok();
        }
    }
}
