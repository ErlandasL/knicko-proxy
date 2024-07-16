### Endpoints
Create Order
URL: /orders
Method: POST
Headers: Authorization: Bearer <token>
## Knicko CoinGate Proxy API

### Endpoints

#### Create Order
- **URL:** `/orders`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    order: {
      price_amount: "123.0",
      price_currency: "USD",
      receive_currency: "BTC",
      callback_url: "https://test.com/callback",
      cancel_url: "https://test.com/cancel",
      success_url: "https://test.com/success",
      title: "Order test title",
      description: "Order test description"
    }
  }
  ```

#### Retrieve Order
- **URL:** `/orders/:id`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`

#### Get Orders
- **URL:** `/orders`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`

### Authentication
Use Devise to authenticate users.
