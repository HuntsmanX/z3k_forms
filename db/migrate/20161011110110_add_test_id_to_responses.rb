class AddTestIdToResponses < ActiveRecord::Migration[5.0]
  def change
    add_column :responses, :test_id, :integer
  end
end
