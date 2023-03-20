class StudentsController < ApplicationController

  skip_before_action :user_authentication, only:[:index]
  before_action :is_admin?, only: [:show, :update, :destroy]

  def index
    students = Student.all.order(:last_name)
    render json: students, status: :ok
  end

  def show
    student = Student.find(params[:id])
    render json: student, include: ["courses", "courses.enrollments", "user"], status: :ok
  end

  def create
    new_student = Student.create!(student_params)
    render json: new_student, status: :created
  end

  def update
    student = Student.find(params[:id])
    student.update(student_params)
    render json: student, status: :accepted
  end

  private

  def student_params
    params.require(:student).permit(:first_name, :last_name, :birthday, :created_at, :gender, :interest, :user_id, :notes)
  end
end
