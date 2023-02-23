class CreateCourses < ActiveRecord::Migration[7.0]
  def change
    create_table :courses do |t|
      t.string :title
      t.datetime :start_time
      t.datetime :end_time
      t.string :location
      t.float :price

      t.timestamps
    end
  end
end
