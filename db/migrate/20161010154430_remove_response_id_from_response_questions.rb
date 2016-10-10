class RemoveResponseIdFromResponseQuestions < ActiveRecord::Migration[5.0]
  def change
    remove_column :response_questions, :response_id, :integer
  end
end
