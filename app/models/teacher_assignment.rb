class TeacherAssignment < ApplicationRecord
  belongs_to :teacher
  belongs_to :course

  validates :teacher_id, :course_id, presence: true
  validates :teacher_id, uniqueness: { scope: :course_id }
end
