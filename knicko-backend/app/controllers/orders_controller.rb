class OrdersController < ApplicationController
  before_action :authenticate_user!

  def index
    begin
      coingate_orders = CoingateService.get_orders_list
      render json: coingate_orders
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Orders not found' }, status: :not_found
    rescue StandardError => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  def create
    coingate_order = CoingateService.create_order(order_params)

    if coingate_order['errors'].nil?
      render json: { order: coingate_order, payment_url: coingate_order['payment_url'] }, status: :created
    else
      render json: { errors: coingate_order['errors'] || coingate_order['message'] }, status: :unprocessable_entity
    end
  end

  def show
    begin
      coingate_order = CoingateService.get_order(params[:id])
      render json: coingate_order
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Order not found' }, status: :not_found
    rescue StandardError => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  def get_order
    coingate_order = CoingateService.get_order(params[:id])

    if coingate_order['id']
      render json: coingate_order
    else
      render json: { errors: 'Order not found' }, status: :not_found
    end
  end

  private

  def order_params
    params.require(:order).permit(:price_amount, :price_currency, :receive_currency, :callback_url, :cancel_url, :success_url, :title, :description)
  end
end