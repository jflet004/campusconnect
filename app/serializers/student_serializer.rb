class StudentSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :birthday, :age, :gender, :interest, :user_id, :notes, :created_at
  has_one :user
  has_many :courses


  def age
    birthday = object.birthday
    today = Time.current
    age = today.year - birthday.year
    age -= 1 if today < birthday + age.years
    age
  end

  def created_at
    object.created_at.to_date.strftime("%Y-%m-%d")
  end

end
