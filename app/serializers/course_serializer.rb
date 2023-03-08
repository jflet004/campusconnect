class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :start_time, :end_time, :location, :capacity, :students_enrolled, :price
  has_many :teacher_assignments
  has_many :teachers, thorugh: :teacher_assignments
  has_many :enrollments
  has_many :students, through: :enrollments

  def start_time
    object.start_time.strftime('%I:%M %p')
  end

  def end_time
    object.end_time.strftime('%I:%M %p')
  end

end
