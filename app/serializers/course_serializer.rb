class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :start_time, :end_time, :location, :capacity, :students_enrolled, :price, :teacher_id
  has_one :teacher
  has_many :enrollments
  has_many :students, through: :enrollments

  # def start_time
  #   object.start_time.strftime('%I:%M %p')
  # end
  def start_time
    object.start_time.strftime('%Y-%m-%dT%H:%M:%S.%L').chop
  end

  def end_time
    object.end_time.strftime('%Y-%m-%dT%H:%M:%S.%L').chop
  end

  # def end_time
  #   object.end_time.strftime('%I:%M %p')
  # end

end
