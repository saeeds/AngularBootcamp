using Core.Entities;

namespace Core.Specifications
{
  public class ProductWithTypesAndBrandsSpecification : BaseSpecification<Product>
  {
    public ProductWithTypesAndBrandsSpecification(ProductSpecParams productParams)
      : base(x =>
        (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search))
        && (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId)
        && (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
      )
    {
      AddInclude(x => x.ProductType);
      AddInclude(x => x.ProductBrand);
      AddOrderBy(x => x.Name);
      ApplyPaging(productParams.PgaeSize * (productParams.PageIndex - 1), productParams.PgaeSize);
      if (!string.IsNullOrEmpty(productParams.Sort))
      {
        switch (productParams.Sort)
        {
          case "priceAsc":
            AddOrderBy(p => p.Price);
            break;
          case "priceDesc":
            AddOrderByDescending(p => p.Price);
            break;
          default:
            AddOrderBy(n => n.Name);
            break;
        }
      }
    }

    public ProductWithTypesAndBrandsSpecification(int id) : base(x => x.Id == id)
    {
      AddInclude(x => x.ProductType);
      AddInclude(x => x.ProductBrand);
    }
  }
}