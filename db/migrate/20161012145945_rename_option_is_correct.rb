class RenameOptionIsCorrect < ActiveRecord::Migration[5.0]
  def change
    rename_column :test_options, :is_correct, :isCorrect
    rename_column :response_options, :is_correct, :isCorrect
  end
end
