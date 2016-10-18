class AddUidToResponseSections < ActiveRecord::Migration[5.0]
  def change
    add_column :response_sections, :uuid, :string
  end
end
