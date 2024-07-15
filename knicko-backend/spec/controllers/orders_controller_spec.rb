require 'rails_helper'

RSpec.describe "OrdersController", type: :request do
  let(:user) { User.create(email: 'test@test.com', password: 'test123') }
  let(:auth_headers) do
    post user_session_path, params: { user: { email: user.email, password: user.password } }
    {
      'Authorization' => response.headers['Authorization']
    }
  end
  let(:order_params) do
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
  end

  describe "POST /orders" do
    it "creates an order" do
      post "/orders", params: order_params, headers: auth_headers
      expect(response).to have_http_status(:created).or have_http_status(:ok)
      @order_id = JSON.parse(response.body)["id"]
    end
  end

  describe "GET /orders" do
    it "gets orders list" do
      get "/orders", headers: auth_headers
      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET /orders/:id" do
    before(:each) do
      post "/orders", params: order_params, headers: auth_headers
      @order_id = JSON.parse(response.body)["id"]
    end

    it "retrieves the order" do
      get "/orders/#{@order_id}", headers: auth_headers
      expect(response).to have_http_status(:ok)
    end
  end
end