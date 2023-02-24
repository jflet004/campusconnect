class Enrollment < ApplicationRecord
  belongs_to :student
  belongs_to :course

  validates :student_id, uniqueness: {scope: :course_id, message: "Already enrolled in this course"}
end
