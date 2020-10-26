using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FreakNComics.Models
{
    public class LineItem
    {
        public int LineItemId { get; set; }
        public int PurchaseOrderId { get; set; }
        public int ProductId { get; set; }
        public decimal UnitPrice { get; set; }
        public int LineItemQuantity { get; set; }
    }
}
