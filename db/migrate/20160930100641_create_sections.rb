class CreateSections < ActiveRecord::Migration[5.0]
  def change
    create_table :sections do |t|
      t.string :name
      t.integer :time_for_test
      t.belongs_to :test
      t.timestamps
    end
  end
end
