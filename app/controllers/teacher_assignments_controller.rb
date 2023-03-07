class TeacherAssignmentsController < ApplicationController

  def index
    render json: TeacherAssignment.all, status: :ok
  end
  
end
