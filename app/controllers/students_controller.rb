class StudentsController < ApplicationController

  def index
    students = Student.all
    render json: students, status: :ok
  end

  def show
    student = Student.find(params[:id])
    render json: student, status: :ok
  end

  def create
    new_student = Student.create!(student_params)
    render json: new_student, status: :created
  end

  private

  def student_params
    params.require(:student).permit(:first_name, :last_name, :birthday, :gender, :interest, :user_id, :notes)
  end
end
