class Course < ApplicationRecord
  has_many :teacher_assignments
  has_many :teachers, through: :teacher_assignments
  has_many :enrollments, dependent: :destroy
  has_many :students, through: :enrollments

  # validate :course_is_full

  def students_enrolled
    self.students.count
  end


  # def course_is_full
  #   if self.students_enrolled >= self.capacity
  #     render json: { errors: "Capacity has been reached" }, status: :unprocessable_entity
  #   end
  # end
  
end
