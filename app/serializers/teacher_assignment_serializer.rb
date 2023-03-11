class TeacherAssignmentSerializer < ActiveModel::Serializer
  attributes :id, :teacher_id, :course_id
  belongs_to :teacher
  belongs_to :course
end
