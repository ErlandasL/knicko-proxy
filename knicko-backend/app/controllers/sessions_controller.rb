require 'jwt'

class SessionsController < Devise::SessionsController
  respond_to :json

  def create
    user = User.find_by(email: sign_in_params[:email])

    if user&.valid_password?(sign_in_params[:password])
      sign_in(user)

      # Generate JWT token
      payload = { user_id: user.id }
      token = JWT.encode(payload, Rails.application.credentials.secret_key_base)

      render json: {
        id: user.id,
        email: user.email,
        token: token
      }, status: :ok
    else
      render json: { error: 'Invalid Email or Password' }, status: :unauthorized
    end
  end

  private

  def sign_in_params
    params.require(:user).permit(:email, :password)
  end
end