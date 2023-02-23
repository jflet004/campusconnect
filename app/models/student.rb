class Student < ApplicationRecord
  belongs_to :user

  validates :first_name, presence:true
  validates :last_name, presence:true
  validates :birthday, presence:true
  validates :interest, presence:true

end
