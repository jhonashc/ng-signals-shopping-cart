import { Component, inject, Input, OnInit } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';

import { Product } from '../../interfaces';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CurrencyPipe, NgOptimizedImage],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent implements OnInit {
  @Input({ required: true })
  public product!: Product;

  public cartService = inject(CartService);

  ngOnInit(): void {
    if (!this.product) {
      throw new Error('The property product is required');
    }
  }
}
