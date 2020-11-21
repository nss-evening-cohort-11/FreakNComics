using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FreakNComics.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using FreakNComics.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FreakNComics.Controllers
{
    [Route("api/PaymentType")]
    [ApiController]
    public class PaymentTypeController : ControllerBase
    {
        readonly PaymentTypeRepository _repo;

        public PaymentTypeController(PaymentTypeRepository repo)
        {
            _repo = repo;
        }
        // GET: api/<PaymentTypeController>
        [HttpGet]
        public IActionResult GetAll()
        {
            var allPaymentTypes = _repo.GetAllPaymentTypes();

            return Ok(allPaymentTypes);
        }

        // GET api/<PaymentTypeController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var paymentType = _repo.GetByPaymentTypeId(id);

            if (paymentType == null) return NotFound("No Payment Type with that Id was found");

            return Ok(paymentType);
        }

        // POST api/<PaymentTypeController>
        [HttpPost]
        public IActionResult AddPaymentType(PaymentType paymentType)
        {
            _repo.Add(paymentType);

            return Created($"/api/paymentType/{paymentType.PaymentTypeId}", paymentType);
        }

        // PUT api/<PaymentTypeController>/5
        [HttpPut("{id}")]
      
        public IActionResult UpdatePaymentType(int id, PaymentType paymentType)
        {
            if (_repo.GetByPaymentTypeId(id) == null)
            {
                return NotFound();
            }

            var updatedPaymentType = _repo.UpdatePaymentType(id, paymentType);

            return Ok(updatedPaymentType);

        }

        //    // DELETE api/PaymentType/5
        //    [HttpDelete("{id}")]
        //    public void Delete(int id)
        //    {
        //    }
    }
}
