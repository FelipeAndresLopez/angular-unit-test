import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from '../../services/product.service';
import { generateProducts } from '../../models/product.mock';
import { defer, of } from 'rxjs';

fdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getAll'])
    await TestBed.configureTestingModule({
      imports: [ProductsComponent, HttpClientTestingModule],
      providers: [{ provide: ProductsService, useValue: productServiceSpy }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>
    const productsMock = generateProducts()
    productService.getAll.and.returnValue(of(productsMock))
    fixture.detectChanges(); // ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Get All Products', () => {
    it('should return product list from service', () => {
      // Arrange
      const productsMock = generateProducts()
      const prevCount = component.limit
      // Act
      productService.getAll.and.returnValue(of(productsMock))

      component.getAllProducts()
      fixture.detectChanges(); // ngOnInit

      // Assert
      expect(component.products.length).toEqual(productsMock.length + prevCount)
    })

    it('should change status "loading" to "success"', fakeAsync(() => {
      // Arrange
      const productsMock = generateProducts()
      productService.getAll.and.returnValue(defer(() => Promise.resolve(productsMock)))
      // Act
      component.getAllProducts()
      fixture.detectChanges(); // ngOnInit

      expect(component.status).toEqual('loading')
      tick() // Executes observers, promise or something async

      fixture.detectChanges(); // ngOnInit
      expect(component.status).toEqual('success')
    }))

    it('should change status "loading" to "error"', fakeAsync(() => {
      // Arrange
      productService.getAll.and.returnValue(defer(() => Promise.reject(new Error('server error'))))
      // Act
      component.getAllProducts()
      fixture.detectChanges(); // ngOnInit

      expect(component.status).toEqual('loading')
      tick(1000) // Executes observers, setTimeout, promise or something async. For setTimeout set the time in the tick

      fixture.detectChanges(); // ngOnInit
      expect(component.status).toEqual('error')
    }))
  });

});
