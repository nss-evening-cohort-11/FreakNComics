using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FreakNComics.Data;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FreakNComics.Controllers
{
    [Route("api/lineitemwithproduct")]
    [ApiController]
    public class LineItemWithProductController : ControllerBase
    {
       LineItemWithProductRepository _repo;
        public LineItemWithProductController()
        {
            _repo = new LineItemWithProductRepository();
        }
        // GET: api/lineitemwithproduct/3/items>
        [HttpGet("{id}/items")]
        public IActionResult GetLineItemWithProductInfo(int id)
        {
            var items = _repo.GetLineItemsWithProduct(id);

            if (items == null) return NotFound();

            return Ok(items);
        }

       
     
    }
}
