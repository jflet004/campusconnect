# puts "Deleting previous data"
# Student.destroy_all
# puts "Deleted all students"
# User.destroy_all
# puts "Deleted all users"
Classroom.destroy_all
Course.destroy_all
puts "Deleted all courses"

puts "Seeding new data"

# puts "Creating new users"
# u1	=	User.create(first_name: 'David', last_name: 'Williams', email: 'dwilliams@gmail.com', password: 'password', phone_number: '714-398-2878', address: '796 Main St', city: 'San Fernando', state: 'CA', zip_code: '93142', notes: "wants to enroll her younger daughter next year")
# u2	=	User.create(first_name: 'Alice', last_name: 'Vargas', email: 'avargas@gmail.com', password: 'password', phone_number: '804-809-7698', address: '704 Pine St', city: 'San Fernando', state: 'CA', zip_code: '92072', notes: "")
# u3	=	User.create(first_name: 'Olivia', last_name: 'Qureshi', email: 'oqureshi@gmail.com', password: 'password', phone_number: '779-892-8447', address: '031 Oak St', city: 'Hawthorne', state: 'CA', zip_code: '92571', notes: "would like to change teachers")
# u4	=	User.create(first_name: 'Emily', last_name: 'Vargas', email: 'evargas@gmail.com', password: 'password', phone_number: '233-382-5309', address: '259 Elm St', city: 'Lancaster', state: 'CA', zip_code: '91560', notes: "")
# u5	=	User.create(first_name: 'Olivia', last_name: 'Nguyen', email: 'onguyen@gmail.com', password: 'password', phone_number: '234-396-8692', address: '453 Main St', city: 'Culver City', state: 'CA', zip_code: '91556', notes: "kids have been sick for over a month")
# u6	=	User.create(first_name: 'Olivia', last_name: 'Edwards', email: 'oedwards@gmail.com', password: 'password', phone_number: '734-148-6502', address: '662 Oak St', city: 'Compton', state: 'CA', zip_code: '91280', notes: "")
# u7	=	User.create(first_name: 'Frank', last_name: 'Rodriguez', email: 'frodriguez@gmail.com', password: 'password', phone_number: '293-537-4623', address: '697 Elm St', city: 'Brentwood', state: 'CA', zip_code: '93415', notes: "requested financial aid for March 2023")
# u8	=	User.create(first_name: 'Henry', last_name: 'Jackson', email: 'hjackson@gmail.com', password: 'password', phone_number: '283-737-1506', address: '084 Main St', city: 'Culver City', state: 'CA', zip_code: '92528', notes: "")
# u9	=	User.create(first_name: 'Emily', last_name: 'Connor', email: 'econnor@gmail.com', password: 'password', phone_number: '329-313-5462', address: '656 Oak St', city: 'Santa Monica', state: 'CA', zip_code: '90158', notes: "requested a refund due to teacher cancelling often")
# u10	=	User.create(first_name: 'Quinn', last_name: 'Thompson', email: 'qthompson@gmail.com', password: 'password', phone_number: '954-422-6262', address: '493 Oak St', city: 'Beverly Hills', state: 'CA', zip_code: '90449', notes: "")
# u11	=	User.create(first_name: 'Zoe', last_name: 'Perez', email: 'zperez@gmail.com', password: 'password', phone_number: '102-210-1958', address: '207 Main St', city: 'Burbank', state: 'CA', zip_code: '92107', notes: "")
# u12	=	User.create(first_name: 'Taylor', last_name: 'Rodriguez', email: 'trodriguez@gmail.com', password: 'password', phone_number: '166-773-7215', address: '640 Pine St', city: 'Santa Monica', state: 'CA', zip_code: '93025', notes: "requested a refund due to teacher cancelling often")
# u13	=	User.create(first_name: 'Noah', last_name: 'Xu', email: 'nxu@gmail.com', password: 'password', phone_number: '837-357-5069', address: '652 Elm St', city: 'Compton', state: 'CA', zip_code: '90945', notes: "")
# u14	=	User.create(first_name: 'Will', last_name: 'Rodriguez', email: 'wrodriguez@gmail.com', password: 'password', phone_number: '634-541-1165', address: '200 Elm St', city: 'Hawthorne', state: 'CA', zip_code: '91113', notes: "")
# u15	=	User.create(first_name: 'Emily', last_name: 'Hernandez', email: 'ehernandez@gmail.com', password: 'password', phone_number: '220-866-1759', address: '606 Main St', city: 'Pomona', state: 'CA', zip_code: '91581', notes: "")
# u16	=	User.create(first_name: 'Sophia', last_name: 'Martinez', email: 'smartinez@gmail.com', password: 'password', phone_number: '723-874-3301', address: '772 Elm St', city: 'Long Beach', state: 'CA', zip_code: '91089', notes: "will drop their kids if we don't get our act together")
# u17	=	User.create(first_name: 'Jack', last_name: 'Vargas', email: 'jvargas@gmail.com', password: 'password', phone_number: '315-488-4219', address: '669 Elm St', city: 'Hawthorne', state: 'CA', zip_code: '91570', notes: "didn't pay last month's tuition")
# u18	=	User.create(first_name: 'Olivia', last_name: 'Davis', email: 'odavis@gmail.com', password: 'password', phone_number: '363-401-1263', address: '603 Elm St', city: 'Culver City', state: 'CA', zip_code: '90292', notes: "")
# u19	=	User.create(first_name: 'Frank', last_name: 'Jackson', email: 'fjackson@gmail.com', password: 'password', phone_number: '602-583-7124', address: '238 Main St', city: 'Calabasas', state: 'CA', zip_code: '91726', notes: "")
# u20	=	User.create(first_name: 'Yara', last_name: 'Yi', email: 'yyi@gmail.com', password: 'password', phone_number: '457-774-7108', address: '873 Pine St', city: 'Malibu', state: 'CA', zip_code: '92096', notes: "Super nice! My favorite")

# puts "Creating Admin users"
# u21	=	User.create(admin: true, first_name: 'Jose', last_name: 'Fletes', email: 'jfletes@lamusart.org', password: 'eagles40', phone_number: '706-791-5824', address: '959 N Placentia Ave.', city: 'Fullerton', state: 'CA', zip_code: '92831')

# puts "Creating new students"
# s1	=	Student.create(first_name: "Taylor", last_name: "Thompson", birthday: Date.new(2005, 7, 6), gender: "Male", interest: "Dance", notes: "", user_id: u15.id)
# s2	=	Student.create(first_name: "Grace", last_name: "Edwards", birthday: Date.new(2013, 6, 2), gender: "Non-binary/non-conforming", interest: "Music", notes: "Great work! You really nailed that assignment.", user_id: u18.id)
# s3	=	Student.create(first_name: "Charlie", last_name: "Ingram", birthday: Date.new(2016, 5, 27), gender: "Male", interest: "Drama", notes: "", user_id: u15.id)
# s4	=	Student.create(first_name: "Grace", last_name: "Jackson", birthday: Date.new(2007, 6, 18), gender: "Non-binary/non-conforming", interest: "Drama", notes: "", user_id: u16.id)
# s5	=	Student.create(first_name: "Victoria", last_name: "Jackson", birthday: Date.new(2015, 2, 4), gender: "Male", interest: "Drama", notes: "I'm proud of the progress you've made this semester.", user_id: u12.id)
# s6	=	Student.create(first_name: "Frank", last_name: "Thompson", birthday: Date.new(2006, 6, 7), gender: "Prefer not to respond", interest: "Art", notes: "", user_id: u19.id)
# s7	=	Student.create(first_name: "Victoria", last_name: "Yi", birthday: Date.new(2005, 9, 12), gender: "Prefer not to respond", interest: "Music", notes: "", user_id: u10.id)
# s8	=	Student.create(first_name: "Quinn", last_name: "Qureshi", birthday: Date.new(2010, 12, 18), gender: "Female", interest: "Drama", notes: "Your creativity really shines through in your work.", user_id: u6.id)
# s9	=	Student.create(first_name: "Parker", last_name: "Davis", birthday: Date.new(2016, 4, 11), gender: "Non-binary/non-conforming", interest: "Drama", notes: "", user_id: u11.id)
# s10	=	Student.create(first_name: "Mia", last_name: "Lee", birthday: Date.new(2016, 11, 5), gender: "Male", interest: "Music", notes: "You are a talented writer/artist/musician/etc.", user_id: u6.id)
# s11	=	Student.create(first_name: "Henry", last_name: "Chen", birthday: Date.new(2013, 7, 14), gender: "Male", interest: "Dance", notes: "", user_id: u6.id)
# s12	=	Student.create(first_name: "Isabelle", last_name: "Chen", birthday: Date.new(2006, 3, 5), gender: "Non-binary/non-conforming", interest: "Music", notes: "I appreciate the effort you put into this project.", user_id: u20.id)
# s13	=	Student.create(first_name: "Charlie", last_name: "Lee", birthday: Date.new(2016, 5, 26), gender: "Male", interest: "Dance", notes: "", user_id: u6.id)
# s14	=	Student.create(first_name: "Quinn", last_name: "Martinez", birthday: Date.new(2014, 4, 27), gender: "Prefer not to respond", interest: "Music", notes: "You're a great team player and collaborator.", user_id: u14.id)
# s15	=	Student.create(first_name: "Parker", last_name: "Edwards", birthday: Date.new(2016, 12, 12), gender: "Male", interest: "Drama", notes: "", user_id: u17.id)
# s16	=	Student.create(first_name: "Victoria", last_name: "Qureshi", birthday: Date.new(2018, 2, 27), gender: "Female", interest: "Music", notes: "Your positive attitude and kindness are appreciated.", user_id: u17.id)
# s17	=	Student.create(first_name: "Sophia", last_name: "Brown", birthday: Date.new(2013, 5, 9), gender: "Prefer not to respond", interest: "Music", notes: "", user_id: u9.id)
# s18	=	Student.create(first_name: "Bob", last_name: "Davis", birthday: Date.new(2016, 6, 26), gender: "Non-binary/non-conforming", interest: "Dance", notes: "Your dedication and perseverance are admirable.", user_id: u1.id)
# s19	=	Student.create(first_name: "Charlie", last_name: "Lee", birthday: Date.new(2016, 8, 8), gender: "Non-binary/non-conforming", interest: "Music", notes: "", user_id: u1.id)
# s20	=	Student.create(first_name: "Frank", last_name: "Smith", birthday: Date.new(2016, 8, 10), gender: "Non-binary/non-conforming", interest: "Art", notes: "", user_id: u17.id)
# s21	=	Student.create(first_name: "Uma", last_name: "Thompson", birthday: Date.new(2006, 3, 26), gender: "Non-binary/non-conforming", interest: "Music", notes: "You've made significant progress in your academic skills.", user_id: u11.id)
# s22	=	Student.create(first_name: "Emily", last_name: "Jackson", birthday: Date.new(2011, 12, 19), gender: "Male", interest: "Music", notes: "I'm impressed by the level of effort you've put into this project.", user_id: u1.id)
# s23	=	Student.create(first_name: "Olivia", last_name: "Brown", birthday: Date.new(2018, 10, 13), gender: "Male", interest: "Drama", notes: "", user_id: u12.id)
# s24	=	Student.create(first_name: "Uma", last_name: "O'Connor", birthday: Date.new(2008, 6, 22), gender: "Female", interest: "Music", notes: "Your attention to detail is impressive.", user_id: u13.id)
# s25	=	Student.create(first_name: "Xavier", last_name: "Zhang", birthday: Date.new(2014, 6, 1), gender: "Prefer not to respond", interest: "Drama", notes: "You've shown a lot of growth in your understanding of the subject.", user_id: u15.id)
# s26	=	Student.create(first_name: "Victoria", last_name: "Upton", birthday: Date.new(2014, 7, 6), gender: "Male", interest: "Drama", notes: "", user_id: u1.id)
# s27	=	Student.create(first_name: "Henry", last_name: "Fisher", birthday: Date.new(2010, 7, 19), gender: "Non-binary/non-conforming", interest: "Dance", notes: "Your enthusiasm for learning is contagious.", user_id: u17.id)
# s28	=	Student.create(first_name: "Henry", last_name: "Xu", birthday: Date.new(2013, 1, 23), gender: "Male", interest: "Drama", notes: "You have a unique perspective that adds value to our class.", user_id: u14.id)
# s29	=	Student.create(first_name: "David", last_name: "Jackson", birthday: Date.new(2010, 2, 26), gender: "Non-binary/non-conforming", interest: "Drama", notes: "I can see you're putting a lot of effort into your work and it shows.", user_id: u2.id)
# s30	=	Student.create(first_name: "Riley", last_name: "Yi", birthday: Date.new(2005, 8, 21), gender: "Prefer not to respond", interest: "Art", notes: "", user_id: u16.id)
# s31	=	Student.create(first_name: "Bob", last_name: "Garcia", birthday: Date.new(2016, 8, 5), gender: "Female", interest: "Art", notes: "You have a great sense of humor and make our class fun.", user_id: u19.id)
# s32	=	Student.create(first_name: "Zoe", last_name: "Rodriguez", birthday: Date.new(2008, 11, 23), gender: "Prefer not to respond", interest: "Music", notes: "You're always willing to lend a hand to your classmates.", user_id: u6.id)
# s33	=	Student.create(first_name: "Liam", last_name: "Perez", birthday: Date.new(2006, 6, 22), gender: "Female", interest: "Art", notes: "Your insights and contributions to class discussions are thoughtful and insightful.", user_id: u8.id)
# s34	=	Student.create(first_name: "Olivia", last_name: "Fisher", birthday: Date.new(2015, 7, 7), gender: "Female", interest: "Dance", notes: "I appreciate the questions you ask, they show you're engaged and curious.", user_id: u20.id)
# s35	=	Student.create(first_name: "Parker", last_name: "Brown", birthday: Date.new(2015, 10, 1), gender: "Female", interest: "Drama", notes: "", user_id: u18.id)
# s36	=	Student.create(first_name: "Jack", last_name: "Upton", birthday: Date.new(2005, 10, 9), gender: "Female", interest: "Dance", notes: "You've demonstrated excellent leadership skills in our class.", user_id: u8.id)
# s37	=	Student.create(first_name: "Uma", last_name: "Rodriguez", birthday: Date.new(2013, 6, 9), gender: "Female", interest: "Art", notes: "You have a real talent for problem-solving.", user_id: u20.id)
# s38	=	Student.create(first_name: "Uma", last_name: "Jackson", birthday: Date.new(2007, 6, 20), gender: "Prefer not to respond", interest: "Music", notes: "", user_id: u7.id)
# s39	=	Student.create(first_name: "Liam", last_name: "Xu", birthday: Date.new(2017, 7, 23), gender: "Prefer not to respond", interest: "Music", notes: "Your hard work is paying off in your results.", user_id: u10.id)
# s40	=	Student.create(first_name: "Sophia", last_name: "Williams", birthday: Date.new(2016, 1, 15), gender: "Non-binary/non-conforming", interest: "Drama", notes: "", user_id: u20.id)
# s41	=	Student.create(first_name: "Sophia", last_name: "Rodriguez", birthday: Date.new(2011, 3, 8), gender: "Male", interest: "Music", notes: "Your creativity and unique approach to the assignment are impressive.", user_id: u13.id)
# s42	=	Student.create(first_name: "Grace", last_name: "Hernandez", birthday: Date.new(2017, 3, 18), gender: "Prefer not to respond", interest: "Music", notes: "You have a natural talent for [insert subject/area].", user_id: u14.id)
# s43	=	Student.create(first_name: "Riley", last_name: "Upton", birthday: Date.new(2014, 1, 21), gender: "Male", interest: "Dance", notes: "You've been a positive influence on your classmates this year.", user_id: u6.id)
# s44	=	Student.create(first_name: "Mia", last_name: "Rodriguez", birthday: Date.new(2017, 1, 22), gender: "Male", interest: "Drama", notes: "Your kindness and compassion towards others is admirable.", user_id: u14.id)
# s45	=	Student.create(first_name: "Taylor", last_name: "Thompson", birthday: Date.new(2009, 8, 8), gender: "Prefer not to respond", interest: "Drama", notes: "", user_id: u5.id)
# s46	=	Student.create(first_name: "Zoe", last_name: "Yi", birthday: Date.new(2015, 1, 1), gender: "Non-binary/non-conforming", interest: "Dance", notes: "You have a real talent for [insert skill/ability].", user_id: u2.id)
# s47	=	Student.create(first_name: "Henry", last_name: "Yi", birthday: Date.new(2014, 4, 27), gender: "Prefer not to respond", interest: "Art", notes: "You've made a lot of progress since the beginning of the year.", user_id: u16.id)
# s48	=	Student.create(first_name: "Noah", last_name: "Edwards", birthday: Date.new(2012, 12, 20), gender: "Prefer not to respond", interest: "Music", notes: "Keep up the good work, I know you can achieve great things.", user_id: u11.id)
# s49	=	Student.create(first_name: "Quinn", last_name: "Martinez", birthday: Date.new(2008, 7, 21), gender: "Non-binary/non-conforming", interest: "Art", notes: "Your perseverance and determination are inspiring.", user_id: u18.id)


puts "Creating rooms"

r1 = Classroom.create(name: 'Room 1')
r2 = Classroom.create(name: 'Room 2')
r3 = Classroom.create(name: 'Room 3')
r4 = Classroom.create(name: 'Room 4')
r5 = Classroom.create(name: 'Room 5')
r6 = Classroom.create(name: 'Room 6')
r7 = Classroom.create(name: 'Room 7')
r8 = Classroom.create(name: 'Room 8')
r9 = Classroom.create(name: 'Room 9')
r10 = Classroom.create(name: 'Room 10')
r11 = Classroom.create(name: 'Room 11')
r12 = Classroom.create(name: 'Room 12')
r13 = Classroom.create(name: 'Room 13')
r14 = Classroom.create(name: 'Room 14')
r15 = Classroom.create(name: 'Room 15')
r16 = Classroom.create(name: 'Room 16')
r17 = Classroom.create(name: 'Room 17')
r18 = Classroom.create(name: 'Room 18')
r19 = Classroom.create(name: 'Upstairs Dance Room')
r20 = Classroom.create(name: 'Room 20')
r21 = Classroom.create(name: 'Room 21')
r22 = Classroom.create(name: 'Room 22')
r23 = Classroom.create(name: 'Downstairs Dance Room')

puts "Creating courses"
c1	=	Course.create(title: 'Art I', start_time: DateTime.new(2023,3,1,9,30,0), end_time: DateTime.new(2023,3,1,11,0,0), location: r20.name, price: 19, capacity: 10)
c2	=	Course.create(title: 'Art II', start_time: DateTime.new(2023,3,1,9,0,0), end_time: DateTime.new(2023,3,1,10,30,0), location: r21.name, price: 19, capacity: 10)
c3	=	Course.create(title: 'Portfolio Development', start_time: DateTime.new(2023,3,1,11,0,0), end_time: DateTime.new(2023,3,1,12,30,0), location: r20.name, price: 19, capacity: 10)
c4	=	Course.create(title: 'Art for the Young', start_time: DateTime.new(2023,3,1,13,0,0), end_time: DateTime.new(2023,3,1,14,30,0), location: r20.name, price: 19, capacity: 10)
c5	=	Course.create(title: 'Visual Art For Adults', start_time: DateTime.new(2023,3,1,18,0,0), end_time: DateTime.new(2023,3,1,19,0,0), location: r21.name, price: 19, capacity: 10)


puts "Done seeding!"