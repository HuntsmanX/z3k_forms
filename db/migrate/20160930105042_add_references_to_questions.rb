class AddReferencesToQuestions < ActiveRecord::Migration[5.0]
  def change
    add_reference :questions, :section, foreign_key: true
  end
end
