class AddAcceptableScoreToResponseSection < ActiveRecord::Migration[5.0]
  def change
    add_column :response_sections, :acceptable_score, :integer
  end
end
