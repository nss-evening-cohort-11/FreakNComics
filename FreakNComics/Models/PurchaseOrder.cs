using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace FreakNComics.Models
{
    public class PurchaseOrder
    {
        public int PurchaseOrderId { get; set; }
        public int UserId { get; set; }
        public DateTime  InvoiceDate { get; set; }
        public int PaymentTypeId { get; set; }
        public decimal Total { get; set; }
        public bool IsComplete { get; set; }
    }
}
