class AddStartRecurColumnToCourses < ActiveRecord::Migration[7.0]
  def change
    add_column :courses, :start_recur, :date
  end
end

