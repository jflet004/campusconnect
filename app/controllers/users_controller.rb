class UsersController < ApplicationController

  def index
    users = User.all
    render json: users, status: :ok
  end
  
  def show
    if current_user
      render json: current_user, status: :ok
    else
      render json: {error: "User not found"}, status: :not_found
    end
  end

  def create
    user = User.create(user_params)
    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end


  
  private

  def user_params
    params.permit(:admin, :first_name, :last_name, :email, :password, :phone_number, :address, :city, :state, :zip_code)
  end

end
