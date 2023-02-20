class UsersController < ApplicationController

  def index
    users = User.all
    render json: users, include: [:students], status: :ok
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

  def users_with_no_students
    render json: User.with_no_students, status: :ok
  end

  def admin_users
    render json: User.admins, status: :ok
  end

  def user_info
    user = User.find(params[:id])
    render json: user, include: [:students], status: :ok
  end
  

  
  private

  def user_params
    params.permit(:admin, :first_name, :last_name, :email, :password, :phone_number, :address, :city, :state, :zip_code, :notes)
  end

end
