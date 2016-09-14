class AddFieldsToTest < ActiveRecord::Migration[5.0]
  def change
    add_column :tests, :name, :string
    add_column :tests, :time_limit, :boolean
    add_column :tests, :time_for_test, :integer
  end
end
