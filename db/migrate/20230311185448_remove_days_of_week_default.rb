class RemoveDaysOfWeekDefault < ActiveRecord::Migration[6.0]
  def change
    change_column_default :courses, :days_of_week, nil
  end
end

