using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using FreakNComics.Models;
using Microsoft.Data.SqlClient;

namespace FreakNComics.Data
{
    public class PaymentTypeRepository
    {
        static List<PaymentType> _PaymentType = new List<PaymentType>();

        const string _connectionString = "Server=localhost;Database=FreakNComics;Trusted_Connection=True;";

        public void Add(PaymentType paymentTypeToAdd)
        {
            var sql = @"INSERT INTO[dbo].[PaymentType]
                                ([Type]
                                ,[UserId]
                                ,[AccountNumber])
                            Output inserted.PaymentTypeId
                            VALUES
                                ( @type, @UserId, @AccountNumber)";
            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, paymentTypeToAdd);

            paymentTypeToAdd.PaymentTypeId = newId;

        }
        public List<PaymentType> GetAllPaymentTypes()
        {
            using var db = new SqlConnection(_connectionString);

            var PaymentTypes = db.Query<PaymentType>("select * from PaymentType");

            return PaymentTypes.ToList();
        }

        public PaymentType GetByPaymentTypeId(int paymentTypeId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select *
                          from PaymentType
                          where PaymentTypeId = @ptid";
            var parameters = new { ptid = paymentTypeId };

            var paymentType = db.QueryFirstOrDefault<PaymentType>(query, parameters);

            return paymentType;
        }
        public PaymentType UpdatePaymentType(int id, PaymentType paymentType)
        {
            var sql = @"UPDATE [dbo].[PaymentType]
                        SET  [Type] = @type
                            ,[UserId] = @userid
                            ,[AccountNumber] = @accountnumber
                        Output inserted.*
                        WHERE PaymentTypeId = @id";

            using var db = new SqlConnection(_connectionString);

            var parameters = new
            {
                paymentType.PaymentTypeId,
                paymentType.Type,
                paymentType.UserId,
                paymentType.AccountNumber,
                id
            };

            var updatedPaymentType = db.QueryFirstOrDefault<PaymentType>(sql, parameters);

            return updatedPaymentType;
        }
    }
}
