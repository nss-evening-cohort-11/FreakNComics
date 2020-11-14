using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FreakNComics.Models
{
    public class LineItemWithProduct
    {
        public int LineItemId { get; set; }
        public int PurchaseOrderId { get; set; }
        public int ProductId { get; set; }
        public decimal UnitPrice { get; set; }
        public int LineItemQuantity { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public string imageUrl { get; set; }
        public bool inStock { get; set; }
    }
}
