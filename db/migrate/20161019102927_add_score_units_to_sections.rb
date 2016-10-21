class AddScoreUnitsToSections < ActiveRecord::Migration[5.0]
  def change
    add_column :test_sections,     :score_units, :integer
    add_column :response_sections, :score_units, :integer
  end
end
