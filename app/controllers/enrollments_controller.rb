class EnrollmentsController < ApplicationController

  def create
    student = Student.find(params[:id])
    course = Course.find(params[:id])
    enrollment = Enrollment.create(student_id: student.id, course_id: course.id)
    render json: enrollment, status: :created
  end

end
