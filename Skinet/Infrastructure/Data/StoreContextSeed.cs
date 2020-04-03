using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
  public class StoreContextSeed
  {
    public static async Task SeedAsync(StoreContext context, ILoggerFactory LoggerFactory)
    {
      try
      {
        if (!context.ProductBrands.Any())
        {
          var brandsData = File.ReadAllText("../Infrastructure/Data/SeedData/brands.json");
          var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
          brands.ForEach(item => context.ProductBrands.Add(new ProductBrand { Name = item.Name }));
          await context.SaveChangesAsync();
        }

        if (!context.ProductTypes.Any())
        {
          var typesData = File.ReadAllText("../Infrastructure/Data/SeedData/types.json");
          var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
          types.ForEach(item => context.ProductTypes.Add(new ProductType { Name = item.Name }));
          await context.SaveChangesAsync();
        }

        if (!context.Products.Any())
        {
          var productsData = File.ReadAllText("../Infrastructure/Data/SeedData/products.json");
          var products = JsonSerializer.Deserialize<List<Product>>(productsData);
          products.ForEach(item => 
           context.Products.Add(new Product { 
               Name = item.Name, 
               Description = item.Description,
               Price = item.Price, 
               PictureUrl = item.PictureUrl,
               ProductTypeId = item.ProductTypeId,
               ProductBrandId = item.ProductBrandId}));
          await context.SaveChangesAsync();
        }
      }
      catch (Exception ex)
      {
        var logger = LoggerFactory.CreateLogger<StoreContextSeed>();
        logger.LogError(ex.Message);
      }
    }
  }
}