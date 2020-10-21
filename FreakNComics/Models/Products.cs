using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FreakNComics.Models
{
    public class Products
    {
        public int ProductId { get; set; }
        public int ProductTypeId { get; set; }
        public char Title {get;set;}
        public char Description { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string imageUrl { get; set; }
        public bool inStock { get; set; }
    }
}
