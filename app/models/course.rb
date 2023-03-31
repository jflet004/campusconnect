class Course < ApplicationRecord

  has_many :teacher_assignments
  has_many :teachers, through: :teacher_assignments
  has_many :enrollments, dependent: :destroy
  has_many :students, through: :enrollments

  validates :title, :start_time, :end_time, :price, :capacity, :days_of_week, :location, presence: true
  validates :price, numericality: { greater_than_or_equal_to: 0 }
  validates :start_recur, presence: true
  validate :start_time_before_end_time
  validate :capacity_non_negative
  validate :time_and_location_unique

  private

  def time_and_location_unique
    if Course.where(location: location, start_time: start_time, end_time: end_time).exists?
      errors.add(:base, "A course with the same time and location already exists")
    end
  end

  def start_time_before_end_time
    if start_time.present? && end_time.present? && start_time >= end_time
      errors.add(:start_time, "must be before end time")
    end
  end

  def capacity_non_negative
    if capacity.present? && capacity < 0
      errors.add(:capacity, "must be greater than or equal to 0")
    end
  end

  def teachers_full_name
    self.teachers.map do |teacher|
      "#{teacher.first_name} #{teacher.last_name}"
    end.join(",")
  end

  def number_of_students_enrolled
    self.enrollments.count
  end

  def space_left
    self.capacity - self.enrollments.count
  end

  def days_offered
    self.start_recur.strftime('%A')
  end

end
