class Student < ApplicationRecord
  belongs_to :user
  has_many :enrollments
  has_many :courses, through: :enrollments

  validates :first_name, :last_name, presence: true
  validates :notes, length: { maximum: 1000 }

end
