class Course < ApplicationRecord

  has_many :teacher_assignments
  has_many :teachers, through: :teacher_assignments
  has_many :enrollments, dependent: :destroy
  has_many :students, through: :enrollments



  def students_enrolled
    self.students.count
  end

  
end
