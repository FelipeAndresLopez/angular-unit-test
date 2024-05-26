import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  private productService = inject(ProductsService);
  products: Product[] = [];

  ngOnInit(): void {

    this.getAllProducts()

  }

  getAllProducts() {
    this.productService.getAll().subscribe(products => {
      this.products = products
    })
  }


}
