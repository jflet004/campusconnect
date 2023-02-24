class Enrollment < ApplicationRecord
  belongs_to :student
  belongs_to :course

  validates :course_id, presence: true
  validates :student_id, presence: true, uniqueness: {scope: :course_id, message: "already enrolled in this course"}
end
