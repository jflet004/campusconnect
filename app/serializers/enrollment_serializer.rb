class EnrollmentSerializer < ActiveModel::Serializer
  attributes :id, :student_id, :course_id
  belongs_to :student
  belongs_to :course
  
  def created_at
    object.created_at.in_time_zone("US/Pacific").strftime('%m-%d-%Y %H:%M')
  end

  def updated_at
    object.updated_at.in_time_zone("US/Pacific").strftime('%m-%d-%Y %H:%M')
  end
end
