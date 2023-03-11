class Teacher < ApplicationRecord
  has_many :teacher_assignments
  has_many :courses, through: :teacher_assignments
end
