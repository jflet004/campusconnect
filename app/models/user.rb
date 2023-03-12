class User < ApplicationRecord
  has_many :students
  has_secure_password

  validates :first_name, presence:true
  validates :last_name, presence:true
  validates :email, uniqueness:true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :address, presence:true
  validates :city, presence:true
  validates :state, presence:true
  validates :zip_code, presence:true
  validates :phone_number, presence:true

  def make_admin
    self.update(admin: true)
  end

  def self.with_no_students
    where.not(id: Student.select(:user_id))
  end

  def self.admins
    where(admin: true)    
  end

  def balance
    students.map do |student|
      student.courses.sum(:price)
    end.sum
  end

end
