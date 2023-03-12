class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :start_time, :end_time, :location, :price, :capacity, :days_of_week, :teachers_full_name
  has_many :enrollments
  has_many :teachers
  

  def start_time
    object.start_time.strftime('%Y-%m-%dT%H:%M:%S.%L').chop
  end

  def end_time
    object.end_time.strftime('%Y-%m-%dT%H:%M:%S.%L').chop
  end

  


end
