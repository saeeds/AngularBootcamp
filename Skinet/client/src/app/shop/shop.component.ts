import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ShopService } from "./shop.service";
import { IProduct } from "../shared/models/product";
import { IBrand } from "../shared/models/brand";
import { IType } from "../shared/models/ProductType";
import { ShopParams } from "../shared/models/shopParams";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.scss"]
})
export class ShopComponent implements OnInit {
  @ViewChild("search", { static: false }) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  ShopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    { name: "Alphabetical", value: "name" },
    { name: "Price: Low to High", value: "priceAsc" },
    { name: "Price: High to Low", value: "priceDesc" }
  ];
  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.ShopParams).subscribe(
      response => {
        this.products = response.data;
        this.ShopParams.pageNumber = response.pageIndex;
        this.ShopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error => {
        console.log(error);
      }
    );
  }

  getBrands() {
    this.shopService.getBrands().subscribe(
      response => {
        this.brands = [{ id: 0, name: "All" }, ...response];
      },
      error => {
        console.log(error);
      }
    );
  }

  getTypes() {
    this.shopService.getTypes().subscribe(
      response => {
        this.types = [{ id: 0, name: "All" }, ...response];
      },
      error => {
        console.log(error);
      }
    );
  }

  onBrandSelected(brandId: number) {
    this.ShopParams.brandId = brandId;
    this.ShopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.ShopParams.typeId = typeId;
    this.ShopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.ShopParams.sort = sort;
    this.ShopParams.pageNumber = 1;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.ShopParams.pageNumber !== event) {
      this.ShopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.ShopParams.search = this.searchTerm.nativeElement.value;
    this.ShopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = "";
    this.ShopParams = new ShopParams();
    this.getProducts();
  }
}
