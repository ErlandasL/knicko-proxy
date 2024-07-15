class ApplicationController < ActionController::API
  before_action :authenticate_user!

  def authenticate_user!
    token = request.headers['Authorization'].split(' ').last if request.headers['Authorization'].present?
    decoded_token = decode_token(token)
    @current_user = User.find(decoded_token[:user_id]) if decoded_token
  rescue
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end

  private

  def decode_token(token)
    JWT.decode(token, Rails.application.credentials.jwt_secret_key, true, algorithm: 'HS256')[0].symbolize_keys
  rescue
    nil
  end
end