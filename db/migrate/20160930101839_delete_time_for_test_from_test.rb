class DeleteTimeForTestFromTest < ActiveRecord::Migration[5.0]
  def change
    remove_column :tests, :time_limit
    remove_column :tests, :time_for_test
    remove_index(:questions, name: 'index_questions_on_test_id')
  end
end
