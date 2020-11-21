using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using FreakNComics.Models;
using Microsoft.Extensions.Configuration;

namespace FreakNComics.Data
{
    public class UsersRepository
    {
        readonly string _connectionString;

        public UsersRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("FreakNComics");
        }

        public IEnumerable<User> GetAll()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = $"select * from users";

            var users = db.Query<User>(sql);

            return users;
        }

        public User GetById(int userId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select *
                        from users
                        where id = @uid";

            var parameters = new { uid = userId };

            var singleUser = db.QueryFirstOrDefault<User>(sql, parameters);
            return singleUser;
        }

        public void AddUser(User userToAdd)
        {
            using var db = new SqlConnection(_connectionString);
            
            var sql = @"INSERT INTO [dbo].[Users]
                               ([FirstName]
                               ,[LastName]
                               ,[Email]
                               ,[Phone]
                               ,[StreetAddress]
                               ,[City]
                               ,[State]
                               ,[ZipCode]
                               ,[Password]
                               ,[DateCreated])
	                    Output inserted.id
                        VALUES
                                (@firstname,@lastname,@email,@phone,@streetaddress,@city,@state,@zipcode,@password,@datecreated)";

            var newId = db.ExecuteScalar<int>(sql, userToAdd);

            userToAdd.Id = newId;
        }

        public void Remove(int userId)
        {
            var sql = @"DELETE 
                        FROM [dbo].[Users]
                        WHERE Id = @id";

            using var db = new SqlConnection(_connectionString);

            db.Execute(sql, new { id = userId });
        }

        public User Update(int id, User userToUpdate)
        {
            var sql = @"UPDATE [dbo].[Users]
                           SET [FirstName] = @firstName
                              ,[LastName] = @lastName
                              ,[Email] = @email
                              ,[Phone] = @phone
                              ,[StreetAddress] = @streetAddress
                              ,[City] = @city
                              ,[State] = @state
                              ,[ZipCode] = @zipCode
                              ,[Password] = @password
                              ,[DateCreated] = @dateCreated
                         OUTPUT inserted.*
                         WHERE id = @id";

            using var db = new SqlConnection(_connectionString);

            var parameters = new
            {
                userToUpdate.FirstName,
                userToUpdate.LastName,
                userToUpdate.Email,
                userToUpdate.Phone,
                userToUpdate.StreetAddress,
                userToUpdate.City,
                userToUpdate.State,
                userToUpdate.ZipCode,
                userToUpdate.Password,
                userToUpdate.DateCreated,
                id
            };

            var updatedUser = db.QueryFirstOrDefault<User>(sql, parameters);

            return updatedUser;
        }
    }
}
