class TeacherAssignment < ApplicationRecord
  belongs_to :courses
  belongs_to :teachers
end
