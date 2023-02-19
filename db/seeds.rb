puts "Deleting previous data"
Student.destroy_all
puts "Deleted all students"
User.destroy_all
puts "Deleted all users"

puts "Seeding new data"
puts "Creating new users"
u1 = User.create(password: "eagles40", admin: false, first_name: "John", last_name: "Wick", email: "johnwick@gmail.com", phone_number: "323-437-5567", address: "232 N Street", city: "Fullerton", state: "CA", zip_code: "92831")
u2 = User.create(password: "eagles40", admin: false, first_name: "Mia", last_name: "Sandoval", email: "msandoval@yahoo.com", phone_number: "760-998-7632", address: "187 S Boulevard", city: "Los Angeles", state: "CA", zip_code: "90063")

puts "Creating new students"
s1 = Student.create(first_name: "Luis", last_name: "Wick", birthday: Date.new(1999, 02, 18), gender: "male", interest: "piano", user_id: u1.id)
s2 = Student.create(first_name: "Maria", last_name: "Wick", birthday: Date.new(2003, 05, 28), gender: "female", interest: "guitar", user_id: u1.id)
s3 = Student.create(first_name: "Ricardo", last_name: "Sandoval", birthday: Date.new(2001, 12, 25), gender: "male", interest: "piano", user_id: u2.id)

puts "Done seeding!"