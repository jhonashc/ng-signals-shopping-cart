import { Component, Input } from '@angular/core';

import { Product } from '../../interfaces/product.interface';

import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  @Input({ required: true })
  public products: Product[] = [];
}
