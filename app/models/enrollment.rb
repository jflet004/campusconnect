class Enrollment < ApplicationRecord
  belongs_to :student
  belongs_to :course

  validates :course_id, presence: true
  validates :student_id, presence: true, uniqueness: {scope: :course_id, message: "already enrolled in this course"}
  validate :course_is_full

  def course_is_full
    if self.course.students_enrolled > self.course.capacity
      errors.add(:base, "Course has reached maximum capacity")
    end
  end

end
