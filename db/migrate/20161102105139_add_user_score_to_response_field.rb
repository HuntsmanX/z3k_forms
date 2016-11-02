class AddUserScoreToResponseField < ActiveRecord::Migration[5.0]
  def change
    add_column :response_fields, :user_score, :integer
  end
end
