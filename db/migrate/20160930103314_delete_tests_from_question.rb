class DeleteTestsFromQuestion < ActiveRecord::Migration[5.0]
  def change
    remove_column :questions, :test_id
  end
end
