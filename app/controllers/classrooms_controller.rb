class ClassroomsController < ApplicationController
  
  def index
    render json: Classroom.all, status: :ok
  end

end
