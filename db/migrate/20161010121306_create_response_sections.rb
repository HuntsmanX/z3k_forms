class CreateResponseSections < ActiveRecord::Migration[5.0]
  def change
    create_table :response_sections do |t|
      t.string :name
      t.integer :time_for_test
      t.belongs_to :response
      t.timestamps
    end
  end
end
