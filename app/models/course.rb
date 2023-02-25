class Course < ApplicationRecord
  has_many :enrollments
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
