class RenameColumns < ActiveRecord::Migration[5.0]
  def change
    rename_column :test_sections,     :time_for_test, :time_limit
    rename_column :test_sections,     :name,          :title
    rename_column :response_sections, :time_for_test, :time_limit
    rename_column :response_sections, :name,          :title
  end
end
