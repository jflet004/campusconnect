class Enrollment < ApplicationRecord
  belongs_to :student
  belongs_to :course

  validates :student_id, :course_id, presence: true
  validates :student_id, uniqueness: { scope: :course_id }

end
