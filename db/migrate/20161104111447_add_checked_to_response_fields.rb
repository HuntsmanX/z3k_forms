class AddCheckedToResponseFields < ActiveRecord::Migration[5.0]
  def change
    add_column :response_fields, :checked, :boolean, default: false
  end
end
