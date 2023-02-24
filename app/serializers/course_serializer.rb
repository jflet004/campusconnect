class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :start_time, :end_time, :location, :price
  has_many :students

  def start_time
    object.start_time.in_time_zone("US/Pacific").strftime('%H:%M')
  end

  def end_time
    object.end_time.in_time_zone("US/Pacific").strftime('%H:%M')
  end

end
