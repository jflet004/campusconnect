class StudentSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :birthday, :age, :created_at, :gender, :interest, :notes
  has_many :courses
  has_one :user


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
