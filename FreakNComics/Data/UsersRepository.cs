﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using FreakNComics.Models;

namespace FreakNComics.Data
{
    public class UsersRepository
    {
        const string _connectionString = "Server = localhost; Database = FreakNComics; Trusted_Connection = True;";

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
    }
}
