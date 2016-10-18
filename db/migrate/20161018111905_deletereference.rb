class Deletereference < ActiveRecord::Migration[5.0]
  def change
    rename_column :response_options, :question_id, :field_id
  end
end
