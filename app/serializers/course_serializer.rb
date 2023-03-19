class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :start_time, :end_time, :location, :price, :capacity, :number_of_students_enrolled, :days_of_week, :start_recur, :teachers_full_name
  has_many :enrollments
  has_many :students, through: :enrollments
  has_many :teacher_assignments
  has_many :teachers, through: :teacher_assignments

  def start_time
    object.start_time.strftime('%H:%M:%S')
  end

  def end_time
    object.end_time.strftime('%H:%M:%S')
  end

end
