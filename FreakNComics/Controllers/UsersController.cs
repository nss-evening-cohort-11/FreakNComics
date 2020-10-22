using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FreakNComics.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FreakNComics.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        UsersRepository _repo;
        
        public UsersController()
        {
            _repo = new UsersRepository();
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var allUsers = _repo.GetAll();
            return Ok(allUsers);
        }
    }
}
