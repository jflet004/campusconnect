class User < ApplicationRecord
  has_many :students
  has_secure_password

  def make_admin
    self.update(admin: true)
  end

  def self.with_no_students
    where.not(id: Student.select(:user_id))
  end

  def self.admins
    where(admin: true)    
  end

end
