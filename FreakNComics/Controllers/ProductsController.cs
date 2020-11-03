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

        [HttpGet("search/{userInput}")]
        public IActionResult GetProductByUserInput(string userInput)
        {
            var product = _repo.GetProductByUserInput(userInput);

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
        public IActionResult UpdatedProducts(int id, Products products)
        {
            var updatedProducts = _repo.Update(id, products);

            return Ok(updatedProducts);
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            if(_repo.GetById(id) == null)
            {
                return NotFound();
            }
            _repo.Remove(id);

            return Ok();
        }
        
    }
}
