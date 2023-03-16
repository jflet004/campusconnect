class ApplicationController < ActionController::API

  before_action :user_authentication

  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end
  
  
  private

  def user_authentication
    return render json: { error: "Not Authorized" }, status: :unauthorized unless current_user
  end
  
  def is_admin?
    authorized = current_user.admin?
    render json: { errors: "Does not have administrative access" }, status: :forbidden unless authorized
  end

  def unprocessable_entity(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def record_not_found(error)
    render json: { errors: "Not Found" }, status: :not_found
  end
end
