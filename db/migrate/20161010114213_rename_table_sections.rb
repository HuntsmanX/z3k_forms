class RenameTableSections < ActiveRecord::Migration[5.0]
  def change
     rename_table :sections, :test_sections
  end
end
