class UsersController < ApplicationController

  skip_before_action :user_authentication, only:[:create, :show, :index, :me]

  def index
    users = User.all
    render json: users, include: {students: {include: [:courses]}}, except: [:updated_at, :created_at], methods: :balance, status: :ok
  end
  
  def show
    user = User.find(params[:id])
    render json: user, include: {students: {include: [:courses]}}, except: [:updated_at, :created_at], methods: :balance, status: :ok
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
  
  def update
    user = User.find(params[:id])
    user.update(user_params)
    render json: user, status: :accepted
  end
  
  # def me
  #   if current_user
  #     render json: current_user, include: {students: {include: [:courses]}}, except: [:updated_at, :created_at], methods: :balance, status: :ok
  #   else
  #     render json: {error: "User not found"}, status: :not_found
  #   end
  # end

  def logged_user
    
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
