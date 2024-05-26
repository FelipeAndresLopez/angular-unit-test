import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from '../../services/product.service';
import { generateProducts } from '../../models/product.mock';
import { defer, of } from 'rxjs';
import { ValueService } from '../../services/value.service';
import { By } from '@angular/platform-browser';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>
  let valueService: jasmine.SpyObj<ValueService>

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getAll'])
    const valueServiceSpy = jasmine.createSpyObj('valueService', ['getPromiseValue'])
    await TestBed.configureTestingModule({
      imports: [ProductsComponent, HttpClientTestingModule],
      providers: [
        { provide: ProductsService, useValue: productServiceSpy },
        { provide: ValueService, useValue: valueServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>
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
      const getAllProductsButtonDE = fixture.debugElement.query(By.css('button.get-products-btn'))
      // Act
      getAllProductsButtonDE.triggerEventHandler('click')
      fixture.detectChanges(); // ngOnInit

      expect(component.status).toEqual('loading')
      tick() // Executes observers, promise or something async

      fixture.detectChanges(); // ngOnInit
      expect(component.status).toEqual('success')
    }))

    it('should change status "loading" to "error"', fakeAsync(() => {
      // Arrange
      productService.getAll.and.returnValue(defer(() => Promise.reject(new Error('server error'))))
      const getAllProductsButtonDE = fixture.debugElement.query(By.css('button.get-products-btn'))
      // Act
      getAllProductsButtonDE.triggerEventHandler('click')
      fixture.detectChanges(); // ngOnInit

      expect(component.status).toEqual('loading')
      tick(1000) // Executes observers, setTimeout, promise or something async. For setTimeout set the time in the tick

      fixture.detectChanges(); // ngOnInit
      expect(component.status).toEqual('error')
    }))
  });

  describe('tests for callPromise', () => {
    it('should call to promise', async () => {
      // Arrange
      const mockMsg = 'my mock msg'
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg))

      // Act
      await component.callPromise()
      fixture.detectChanges()

      // Assert
      expect(component.rta).toEqual(mockMsg)
      expect(valueService.getPromiseValue).toHaveBeenCalled()
    })


    it('should display "my mock msg" in a HTMl Element', fakeAsync(() => {
      // Arrange
      const mockMsg = 'my mock msg'
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg))
      const buttonDebugElement = fixture.debugElement.query(By.css('button.promise-btn'))

      // Act
      buttonDebugElement.triggerEventHandler('click', null)
      tick()
      fixture.detectChanges()
      const pElement: HTMLElement = fixture.debugElement.query(By.css('p.paragraph')).nativeElement


      // Assert
      expect(component.rta).toEqual(mockMsg)
      expect(valueService.getPromiseValue).toHaveBeenCalled()
      expect(pElement.textContent).toEqual(mockMsg)
    }))
  });


});
