class EnrollmentsController < ApplicationController

  def index
    enrollments = Enrollment.all
    render json: enrollments, status: :ok
  end

  def create
    student = Student.find(params[:student_id])
    course = Course.find(params[:course_id])
    enrollment = Enrollment.create!(student: student, course: course)
    render json: enrollment, status: :created
  end
  

  private

  def enrollment_params
    params.permit(:student_id, :course_id)
  end

end
