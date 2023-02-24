class SessionsController < ApplicationController

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
  
end
