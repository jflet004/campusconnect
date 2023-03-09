class AddDaysOfWeekColumnToCourses < ActiveRecord::Migration[7.0]
  def change
    add_column :courses, :days_of_week, :string, array: true, default: []
  end
end

