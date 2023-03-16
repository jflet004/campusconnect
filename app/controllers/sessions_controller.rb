class SessionsController < ApplicationController
  
  skip_before_action :user_authentication, only:[:create, :destroy]
  before_action :require_logout, only: :create
  
  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, include: {students: {include: [:courses]}}, except: [:updated_at, :created_at], methods: :balance, status: :created
    else 
      render json: { errors: "Invalid email or password" }, status: :unauthorized
    end
  end

  def destroy
    session.delete :user_id
    head :no_content
  end

private

def require_logout
  if current_user.present?
    render json: { errors: "You must log out before you can log in as a different user" }, status: :unprocessable_entity
  end
end
  
end
