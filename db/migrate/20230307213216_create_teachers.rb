class CreateTeachers < ActiveRecord::Migration[7.0]
  def change
    create_table :teachers do |t|
      t.boolean :active
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :phone_number
      t.string :address
      t.string :city
      t.string :state
      t.string :postal_code
      t.string :gender

      t.timestamps
    end
  end
end
