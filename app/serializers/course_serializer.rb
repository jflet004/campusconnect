class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :start_time, :end_time, :location, :price
end
