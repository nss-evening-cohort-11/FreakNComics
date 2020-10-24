using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FreakNComics.Data;
using FreakNComics.Models;
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

        [HttpGet("{userId}")]
        public IActionResult GetUserById(int userId)
        {
            var singleUser = _repo.GetById(userId);
            if (singleUser == null) return NotFound("No user with that ID was found");

            return Ok(singleUser);
        }

        [HttpPost]
        public IActionResult AddNewUser(User userToAdd)
        {
            _repo.AddUser(userToAdd);
            return Created($"/ api / users /{ userToAdd.Id}", userToAdd);
        }

        [HttpDelete("{userId}")]
        public IActionResult DeleteUser(int userId)
        {
            if (_repo.GetById(userId) == null)
            {
                NotFound();
            }

            _repo.Remove(userId);
            return Ok();
        }

        [HttpPut("{userId}")]
        public IActionResult UpdateUser(int userId, User userToUpdate)
        {
            var updatedUser = _repo.Update(userId, userToUpdate);

            return Ok(updatedUser);
        }
    }
}
