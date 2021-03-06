class CreateResponseFields < ActiveRecord::Migration[5.0]
  def change
    create_table :response_fields do |t|
      t.integer :question_id
      t.integer :field_type
      t.string  :block_key
      t.text    :content
      t.integer :score
      t.boolean :autocheck

      t.timestamps null: false
      t.timestamps
    end
  end
end
