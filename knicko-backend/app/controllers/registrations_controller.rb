class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    build_resource(sign_up_params)

    resource.save
    render_resource(resource)
  end

  private

  def render_resource(resource)
    if resource.persisted?
      render json: resource, status: :created
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end
end