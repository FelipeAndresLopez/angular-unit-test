import { TestBed } from "@angular/core/testing";
import { ProductsService } from "./product.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { environment } from "../../environments/environment";
import { CreateProductDTO, Product, UpdateProductDTO } from "../models/product.model";
import { generateProducts, generateOneProduct } from "../models/product.mock";

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

  afterEach(() => {
    httpMock.verify()
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

    })
  })

  describe('tests for getAll', () => {

    it('should return a collection of products', (doneFn) => {

      // Arrange
      const dummyProducts: Product[] = generateProducts()

      // act
      productService.getAll().subscribe((products) => {
        // assert
        expect(products.length).toEqual(dummyProducts.length)
        doneFn()
      })


      // http config
      const apiUrl = `${environment.API_URL}/api/v1/products`
      const req = httpMock.expectOne(apiUrl)
      req.flush(dummyProducts)


    })

    it('should return a product list with taxes', (doneFn) => {
      const dummyProducts: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, // 100 * 0.19 = 19
        },
        {
          ...generateOneProduct(),
          price: 200, // 200 * 0.19 = 38
        },
        {
          ...generateOneProduct(),
          price: -100,
        }
      ]

      productService.getAll().subscribe((products) => {
        expect(products[0].taxes).toEqual(19)
        expect(products[1].taxes).toEqual(38)
        expect(products[2].taxes).toEqual(0)

        doneFn()
      })


      // http config
      const apiUrl = `${environment.API_URL}/api/v1/products`
      const req = httpMock.expectOne(apiUrl)
      req.flush(dummyProducts)

    })


    it('should send query params with limit = 10 and offset = 2', (doneFn) => {

      // Arrange
      const dummyProducts: Product[] = generateProducts()
      const limit = 10
      const offset = 2

      // act
      productService.getAll(limit, offset).subscribe((products) => {
        // assert
        expect(products.length).toEqual(dummyProducts.length)
        doneFn()
      })


      // http config
      const apiUrl = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`
      const req = httpMock.expectOne(apiUrl)
      req.flush(dummyProducts)
      const params = req.request.params
      expect(params.get('limit')).toEqual(`${limit}`)


    })
  })

  describe('test for product creation', () => {
    it('should create a product', (doneFn) => {

      const mockProduct = generateOneProduct()
      const dto: CreateProductDTO = {
        title: 'Product 1',
        description: 'Description 1',
        price: 100,
        images: ['image 1', 'image 2'],
        categoryId: 1
      }

      productService.create({ ...dto }).subscribe((data) => {

        expect(data).toEqual(mockProduct)
        doneFn()
      })

      // http config
      const apiUrl = `${environment.API_URL}/api/v1/products`
      const req = httpMock.expectOne(apiUrl)
      req.flush(mockProduct)
      expect(req.request.body).toEqual(dto)
      expect(req.request.method).toEqual('POST')

    })
  })

  describe('test for product update', () => {

    it('should update a product title', (doneFn) => {
      const dummyProduct = generateOneProduct()
      const dto: UpdateProductDTO = {
        title: 'felipe'
      }
      const idProduct = dummyProduct.id

      productService.update(idProduct, { ...dto }).subscribe((updatedProduct) => {
        expect(updatedProduct).toEqual(dummyProduct)
        doneFn()
      })

      const apiUrl = `${environment.API_URL}/api/v1/${idProduct}`
      const req = httpMock.expectOne(apiUrl)
      expect(req.request.method).toEqual('PUT')
      expect(req.request.body).toEqual(dto)

      req.flush(dummyProduct)
    })
  })
})
