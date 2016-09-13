class AddingCityIdForUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :city_id, :integer
  end
end
