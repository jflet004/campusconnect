class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :start_time, :end_time, :location, :price
  has_many :students

  def start_time
    object.start_time.strftime('%I:%M %p')
  end

  def end_time
    object.end_time.strftime('%I:%M %p')
  end

end
