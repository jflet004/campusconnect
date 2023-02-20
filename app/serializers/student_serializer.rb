class StudentSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :birthday, :age, :gender, :interest, :user_id
  has_one :user

  def age
    birthday = object.birthday
    today = Time.current
    age = today.year - birthday.year
    age -= 1 if today < birthday + age.years
    age
  end

end
