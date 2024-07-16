### Steps to run
edit: `EDITOR=nano rails credentials:edit` and add jwt key: `jwt_secret_key: your_secret_key_here`
create `.env` file in root of rails backend folder and add to file your COINGATE_API_KEY and COINGATE_API_URL  or you can use mine: 
`
COINGATE_API_KEY=3zCYy1xQ-dCW9qLcqcxDnsFAdpKg7sanuykixjYG
COINGATE_API_URL=https://api-sandbox.coingate.com/v2/orders
`
run rails on port 3001: `rails s -p 3001`

cd in frontend folder and `npm install` and then `npm run dev`

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
