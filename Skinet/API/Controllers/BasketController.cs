using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class BasketController : BaseApiController
  {
    private readonly IBasketRespository _basketRespository;
    private readonly IMapper _mapper;

    public BasketController(IBasketRespository basketRespository, IMapper mapper)
    {
      _basketRespository = basketRespository;
      _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
    {
      var basket = await _basketRespository.GetBasketAsync(id);

      return Ok(basket ?? new CustomerBasket(id));
    }

    [HttpPost]
    public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasketDto basket)
    {
      var customerBasket = _mapper.Map<CustomerBasketDto, CustomerBasket>(basket);

      var udateBasket = await _basketRespository.UpdateBasketAsync(customerBasket);

      return Ok(udateBasket);
    }

    [HttpDelete]
    public async Task DeleteBasket(string id)
    {
      await _basketRespository.DeleteBasketAsync(id);
    }
  }
}