class Student < ApplicationRecord
  belongs_to :user
  has_many :enrollments
  has_many :courses, through: :enrollments

  validates :first_name, presence:true
  validates :last_name, presence:true
  validates :birthday, presence:true
  validates :interest, presence:true

end
