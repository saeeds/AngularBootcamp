using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using API.Errors;
using Microsoft.AspNetCore.Http;

namespace API.Controllers
{
  public class ProductsController : BaseApiController
  {
    private readonly IGenericRepository<ProductBrand> _productBrandRepo;
    private readonly IGenericRepository<ProductType> _productTypeRepo;
    public IGenericRepository<Product> _productRepo { get; }
    private readonly IMapper _mapper;

    public ProductsController(IGenericRepository<Product> productRepo,
                              IGenericRepository<ProductBrand> productBrandRepo,
                              IGenericRepository<ProductType> productTypeRepo, IMapper mapper)
    {
      _mapper = mapper;
      _productRepo = productRepo;
      _productTypeRepo = productTypeRepo;
      _productBrandRepo = productBrandRepo;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts()
    {
      var spec = new ProductWithTypesAndBrandsSpecification();

      var products = await _productRepo.ListAsync(spec);

      return Ok(_mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products));
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
    {
      var spec = new ProductWithTypesAndBrandsSpecification(id);

      var product = await _productRepo.GetEntityWithSpec(spec);

      if (product == null)
        return NotFound(new ApiResponse(404));

      return _mapper.Map<Product, ProductToReturnDto>(product);
    }

    [HttpGet("brands")]
    public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
    {
      var brands = await _productBrandRepo.ListAllAsync();
      return Ok(brands);
    }

    [HttpGet("types")]
    public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
    {
      var types = await _productTypeRepo.ListAllAsync();
      return Ok(types);
    }
  }
}