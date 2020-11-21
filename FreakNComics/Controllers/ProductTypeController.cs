using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FreakNComics.Data;
using FreakNComics.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FreakNComics.Controllers
{
    [Route("api/producttype")]
    [ApiController]
    public class ProductTypeController : ControllerBase
    {

        readonly ProductTypeRepository _repo;

        public ProductTypeController(ProductTypeRepository repo)
        {
            _repo = repo;
        }

        // GET: api/<ProductTypeController>
        [HttpGet]
        public IActionResult GetAllProductTypes()
        {
            var allProductTypes = _repo.GetAll();

            return Ok(allProductTypes);
        }

        // GET api/<ProductTypeController>/5
        [HttpGet("{id}")]
        public IActionResult GetProductTypeById(int id)
        {
            var productType = _repo.GetById(id);

            if (productType == null) return NotFound("No Product Type With That Id Was Found..");

            return Ok(productType);
        }

        // POST api/<ProductTypeController>
        [HttpPost]
        public IActionResult CreateProductType(ProductType productType)
        {
            _repo.Add(productType);

            return Created($"/api/producttype/{productType.ProductTypeId}", productType);
        }

        // PUT api/<ProductTypeController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ProductTypeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
