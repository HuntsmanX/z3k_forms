class RefactoringModels < ActiveRecord::Migration[5.0]
  def change
    add_column :response_fields, :user_content, :text
    add_column :response_options, :user_selected, :boolean

    remove_column :response_questions, :question_type, :integer
    remove_column :response_questions, :score, :integer

    remove_column :test_questions, :question_type, :integer
    remove_column :test_questions, :score, :integer
  end
end
