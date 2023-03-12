class Course < ApplicationRecord

  has_many :teacher_assignments
  has_many :teachers, through: :teacher_assignments
  has_many :enrollments, dependent: :destroy
  has_many :students, through: :enrollments

  validates :title, presence: true
  validates :start_time, presence: true
  validates :end_time, presence: true
  validates :location, presence: true
  validates :price, presence: true
  validates :capacity, presence: true
  validates :days_of_week, presence: true
  validates :start_recur, presence: true
  
  validate :start_time_not_before_end_time



def teachers_full_name
  self.teachers.map do |teacher|
    "#{teacher.first_name} #{teacher.last_name}"
  end.join(",")
end

def start_time_not_before_end_time
  if start_time.present? && end_time.present? && start_time > end_time
    errors.add(:start_time, "cannot be before end time")
  end
end

  
end
