import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProductListComponent } from '../../components';

import { Product } from '../../interfaces';

import { products } from '../../data/products';

import { CartService } from '../../services/cart.service';

@Component({
  standalone: true,
  imports: [ProductListComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public products: Product[] = products;

  public cartService = inject(CartService);
}
