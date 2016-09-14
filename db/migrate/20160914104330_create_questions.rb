class CreateQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :questions do |t|
      t.string :content
      t.integer :question_type, default: 1
      t.timestamps
      t.belongs_to :test
    end
  end
end
