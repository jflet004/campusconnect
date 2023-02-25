class AddCapacityColumnToCourses < ActiveRecord::Migration[7.0]
  def change
    add_column :courses, :capacity, :integer
  end
end
