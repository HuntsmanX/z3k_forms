class AddDescriptionAndRequiredScoreToSection < ActiveRecord::Migration[5.0]
  def change
    add_column :sections, :description, :text
    add_column :sections, :required_score, :integer
  end
end
