import { Component, inject } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { SideCartComponent } from '../../components/side-cart/side-cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CartSourceService } from '../../services/cart-source.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-product-container',
  imports: [ProductListComponent,
      SideCartComponent,
      ReactiveFormsModule,
      NavbarComponent
    ],
  templateUrl: './product-container.component.html',
  styleUrl: './product-container.component.css',
})
export class ProductContainerComponent {
  protected cartSrv = inject(CartSourceService)
  cart = this.cartSrv.cart
}
