import { TestBed } from "@angular/core/testing";
import { ProductsService } from "./product.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { environment } from "../../environments/environment";
import { Product } from "../models/product.model";
import { generateProducts } from "../models/product.mock";

fdescribe('ProductService', () => {
  let productService: ProductsService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    })

    productService = TestBed.inject(ProductsService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  it('should be created', () => {
    expect(productService).toBeTruthy()
  })

  describe('tests for getAllSimple', () => {

    it('should return a collection of products', () => {
      // Arrange
      const dummyProducts: Product[] = generateProducts()
      // Act
      productService.getAllSimple().subscribe(products => {
        // Assert
        expect(products.length).toEqual(dummyProducts.length)
        expect(products).toEqual(dummyProducts)
      })


      // http config
      const apiUrl = `${environment.API_URL}/api/v1/products`
      const req = httpMock.expectOne(apiUrl)
      req.flush(dummyProducts)
      httpMock.verify()
    })


  })
})
