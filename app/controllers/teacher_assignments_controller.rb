class TeacherAssignmentsController < ApplicationController

  def index
    render json: TeacherAssignment.all, status: :ok
  end

  def create
    assignment = TeacherAssignment.create!(teacher_assignments_params)
    render json: assignment, status: :created
  end

  def destroy
    # byebug
    assignment = TeacherAssignment.find(params[:id])
    assignment.destroy
    head :no_content
  end

  private

  def teacher_assignments_params
    params.permit(:teacher_id, :course_id)
  end
  
end
