import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { ValueService } from '../../services/value.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  private productService = inject(ProductsService);
  private valueService = inject(ValueService)
  products: Product[] = [];
  limit = 10
  offset = 0
  status: 'loading' | 'success' | 'error' | 'init' = 'init'
  rta = ''

  ngOnInit(): void {

    this.getAllProducts()

  }

  getAllProducts() {
    this.status = 'loading'
    this.productService.getAll(this.limit, this.offset)
      .subscribe({
        next: (products) => {
          this.products = [...this.products, ...products]
          this.status = 'success'
          this.offset += this.limit
        },
        error:
          error => {
            setTimeout(() => {
              this.products = []
              this.status = 'error'
            }, 1000);
          }
      })
  }

  async callPromise() {
    const rta = await this.valueService.getPromiseValue()
    this.rta = rta
  }
}
