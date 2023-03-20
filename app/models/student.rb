class Student < ApplicationRecord
  belongs_to :user
  has_many :enrollments
  has_many :courses, through: :enrollments

  validates :first_name, :last_name, presence: true
  validates :notes, length: { maximum: 1000 }
  validate :minimum_age

  def minimum_age
    if birthday.present? && birthday > 4.years.ago.to_date
      errors.add(:student, "must be 4 years or older ")
    end
  end

end
