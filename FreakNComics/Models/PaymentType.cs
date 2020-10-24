using System;


namespace FreakNComics.Models
{
    public class PaymentType
    {
        public int PaymentTypeId { get; set; }
        public string Type { get; set; }
        public int UserId { get; set; }
        public long AccountNumber { get; set; }
    }
}
