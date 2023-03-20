class Enrollment < ApplicationRecord
  belongs_to :student
  belongs_to :course

  validates :student_id, :course_id, presence: true
  validates :student_id, uniqueness: { scope: :course_id }
  validate :validate_capacity

  def validate_capacity
    if course.enrollments.size >= course.capacity
      errors.add(:course, "has reached maximum capacity")
    end
  end
  
end
