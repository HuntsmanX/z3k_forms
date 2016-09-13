class AddSettingsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :settings, :jsonb
    remove_column :users, :encrypted_password
    remove_column :users, :staff_uid
  end
end
