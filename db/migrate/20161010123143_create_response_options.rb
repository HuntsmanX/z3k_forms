class CreateResponseOptions < ActiveRecord::Migration[5.0]
  def change
    create_table :response_options do |t|
      t.string     :content
      t.boolean    :is_correct
      t.references :question
      t.timestamps
    end
  end
end
