using System.Runtime.Serialization;
using System;
namespace Core.Entities.OrderAggregate
{
  public enum OrderStatus
  {
    [EnumMember(Value = "Pending")]
    Pending,
    [EnumMember(Value = "PaymentRecevied")]
    PaymentRecevied,
    [EnumMember(Value = "PaymentFaild")]
    PaymentFaild,
  }
}