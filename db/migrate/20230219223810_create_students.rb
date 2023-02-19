class CreateStudents < ActiveRecord::Migration[7.0]
  def change
    create_table :students do |t|
      t.string :first_name
      t.string :last_name
      t.date :birthday
      t.string :gender
      t.string :interest
      t.integer :user_id

      t.timestamps
    end
  end
end
