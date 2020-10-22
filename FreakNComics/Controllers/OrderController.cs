using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FreakNComics.Models;
using FreakNComics.Data;
using Microsoft.AspNetCore.Mvc;

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
