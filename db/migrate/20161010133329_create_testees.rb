class CreateTestees < ActiveRecord::Migration[5.0]
  def change
    create_table :testees do |t|
      t.integer :source_type, default: 1
      t.integer :user_id
      t.string  :name
      t.string  :email
      t.string  :phone
      t.timestamps
    end
  end
end
