class AddColumnsToResponseSection < ActiveRecord::Migration[5.0]
  def change
    add_column :response_sections, :description, :text
    add_column :response_sections, :required_score, :integer
  end
end
