class RemoveTeacherIdColumnFromCourses < ActiveRecord::Migration[7.0]
  def change
    remove_column :courses, :teacher_id, :integer
  end
end
