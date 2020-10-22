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
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {

        ProductsRepository _repo;

        public ProductsController()
        {
            _repo = new ProductsRepository();
        }


        // GET: api/<ProductController>
        [HttpGet]
        public IActionResult GetAllProducts()
        {
            var allProducts = _repo.GetAll();

            return Ok(allProducts);
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _repo.GetById(id);

            if (product == null) return NotFound("No Product With That Id Was Found..");

            return Ok(product);
        }

        // POST api/<ProductController>
        [HttpPost]
        public IActionResult CreateProduct(Products product)
        {
            _repo.Add(product);

            return Created($"/api/products/{product.ProductId}", product);
        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
