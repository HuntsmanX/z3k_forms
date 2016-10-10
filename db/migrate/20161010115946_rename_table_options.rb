class RenameTableOptions < ActiveRecord::Migration[5.0]
  def change
    rename_table :options, :test_options
  end
end
