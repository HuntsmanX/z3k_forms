class AddScoreToQuestion < ActiveRecord::Migration[5.0]
  def change
    add_column :response_questions, :score, :integer
    add_column :test_questions, :score, :integer
  end
end
