class ChangeTestOptions < ActiveRecord::Migration[5.0]
  def change
    rename_column :test_options,     :isCorrect,   :is_correct
    rename_column :test_options,     :question_id, :field_id
    rename_column :response_options, :isCorrect,   :is_correct
  end
end
