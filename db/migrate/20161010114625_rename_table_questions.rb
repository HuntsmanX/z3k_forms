class RenameTableQuestions < ActiveRecord::Migration[5.0]
  def change
     rename_table :questions, :test_questions
  end
end
