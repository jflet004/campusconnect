class ChangeColumnToString < ActiveRecord::Migration[7.0]
  def change
    change_column :users, :zip_code, :string
  end
end
