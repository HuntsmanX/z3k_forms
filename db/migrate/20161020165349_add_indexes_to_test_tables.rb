class AddIndexesToTestTables < ActiveRecord::Migration[5.0]
  def change
    add_column :test_sections,      :order_index, :integer
    add_column :test_questions,     :order_index, :integer
    add_column :test_options,       :order_index, :integer
    add_column :response_sections,  :order_index, :integer
    add_column :response_questions, :order_index, :integer
    add_column :response_options,   :order_index, :integer
  end
end
