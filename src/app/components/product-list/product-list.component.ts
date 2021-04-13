import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  @Input() product: Product = {
    name: 'test',
    id: '1',
    price: '1.23',
    url: 'https://netlify.com',
    image: 'https://bit.ly/20o7MGL',
    description: 'test',
  };

  private response: any;

  constructor(private http: HttpClient) {}

  async triggerCreateCheckout(eventProduct: any) {
    this.response = await this.http
      .post('/.netlify/functions/createCheckout', eventProduct, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .toPromise();
    this.openStripe(this.response);
  }

  openStripe = async (stripeParams: any) => {
    const stripe = await loadStripe(stripeParams.publishableKey);
    const { error } = await stripe!.redirectToCheckout({
      sessionId: stripeParams.sessionId,
    });
  };

  ngOnInit(): void {}
}
