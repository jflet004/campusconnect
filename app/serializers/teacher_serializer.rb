class TeacherSerializer < ActiveModel::Serializer
  attributes :id, :active, :first_name, :last_name, :email, :phone_number, :address, :city, :state, :postal_code, :gender
  has_many :courses
  
end
