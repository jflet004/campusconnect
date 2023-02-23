class CoursesController < ApplicationController

  def index
    courses = Course.all
    render json: courses, include: [:students], status: :ok
  end


  private

  def course_params
    params.permit(:title, :start_time, :end_time, :location, :price)
  end

end
