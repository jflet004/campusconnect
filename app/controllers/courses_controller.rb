class CoursesController < ApplicationController

  def index
    courses = Course.all
    render json: courses, status: :ok
  end

  def show
    course = Course.find(params[:id])
    render json: course, status: :ok
  end


  private

  def course_params
    params.permit(:title, :start_time, :end_time, :location, :price)
  end

end
