class ChangeQuestionContent < ActiveRecord::Migration[5.0]
  def change
    change_column :questions, :content, :text
  end
end
