  class TeacherAssignmentsController < ApplicationController

    def index
      assignments = TeacherAssignment.all
      render json: assignments, status: :ok
    end

    def show
      assignment = TeacherAssignment.find(params[:id])
      render json: assignment, status: :ok
    end

    def create
      newAssignment = TeacherAssignment.create!(assignment_params)
      render json: newAssignment, status: :created
    end

    def destroy
      assignment = TeacherAssignment.find(params[:id])
      assignment.destroy
      head :no_content
    end

    private

    def assignment_params
      params.permit(:teacher_id, :course_id)
    end

  end
