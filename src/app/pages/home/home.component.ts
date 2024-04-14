import { Component } from '@angular/core';

import { ProductListComponent } from '../../components';

import { Product } from '../../interfaces/product.interface';

import { products } from '../../data/products';

@Component({
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public products: Product[] = products;
}
