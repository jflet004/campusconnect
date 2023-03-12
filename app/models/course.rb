class Course < ApplicationRecord

has_many :teacher_assignments
  has_many :teachers, through: :teacher_assignments
  has_many :enrollments, dependent: :destroy
  has_many :students, through: :enrollments



def teachers_full_name
  self.teachers.map do |teacher|
    "#{teacher.first_name} #{teacher.last_name}"
  end.join(",")
end

  
end
