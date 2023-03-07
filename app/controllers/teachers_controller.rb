class TeachersController < ApplicationController

  def index
    teachers = Teacher.all.order(:last_name)
    render json: teachers, status: :ok
  end

  def show
    teacher = Teacher.find(params[:id])
    render json: teacher, status: :ok
  end

  def create
    new_teacher = Teacher.create!(teacher_params)
    render json: new_teacher, status: :created
  end

  def update
    teacher = Teacher.find(params[:id])
    teacher.update(teacher_params)
    render json: teacher, status: :accepted
  end


  private

  def teacher_params
    params.require(:teacher).permit(:active, :first_name, :last_name, :email, :phone_number, :address, :city, :state, :postal_code, :gender)
  end

end
