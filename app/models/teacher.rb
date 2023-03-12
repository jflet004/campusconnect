class Teacher < ApplicationRecord
  has_many :teacher_assignments
  has_many :courses, through: :teacher_assignments

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :phone_number, length: { in: 10..15 }

end
