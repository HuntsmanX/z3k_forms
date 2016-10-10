class CreateResponseResponses < ActiveRecord::Migration[5.0]
  def change
    create_table :responses do |t|
      t.string :name
      t.timestamps
    end
  end
end
