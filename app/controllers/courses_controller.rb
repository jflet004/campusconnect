class CoursesController < ApplicationController

  skip_before_action :user_authentication, only: [:index]
  before_action :is_admin?, only: [:show, :create, :update]
  
  def index
    courses = Course.all
    render json: courses, status: :ok
  end

  def show
    course = Course.find(params[:id])
    render json: course, status: :ok
  end

  def create
    course = Course.create!(course_params)
    render json: course, status: :created
  end

  def update
    course = Course.find(params[:id])
    course.update(course_params)
    render json: course, status: :accepted
  end

  def destroy
    course = Course.find(params[:id])
    course.destroy
    head :no_content
  end


  private

  def course_params
    params.permit(:title, :start_time, :end_time, :location, :capacity, :price, :start_recur, days_of_week:[])
  end

end
