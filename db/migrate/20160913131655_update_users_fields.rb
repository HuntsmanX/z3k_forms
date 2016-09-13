class UpdateUsersFields < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :reset_password_token
    remove_column :users, :reset_password_sent_at
    remove_column :users, :remember_created_at
    add_column :users, :staff_uid, :integer
  end
end
