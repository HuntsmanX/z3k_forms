class CreateResponseQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :response_questions do |t|
      t.string :content
      t.integer :question_type, default: 1
      t.timestamps
      t.belongs_to :response
      t.belongs_to :section
      t.timestamps
    end
  end
end
