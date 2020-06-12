namespace Core.Entities.OrderAggregate
{
  public class Address
  {
    public Address()
    {
    }

    public Address(string fisrtName, string lastName, string street, string city, string state, string zipcode)
    {
      FisrtName = fisrtName;
      LastName = lastName;
      Street = street;
      City = city;
      State = state;
      Zipcode = zipcode;
    }

    public string FisrtName { get; set; }
    public string LastName { get; set; }
    public string Street { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string Zipcode { get; set; }

  }
}