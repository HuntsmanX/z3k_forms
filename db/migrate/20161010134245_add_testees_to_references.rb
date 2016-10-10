class AddTesteesToReferences < ActiveRecord::Migration[5.0]
  def change
    add_reference :responses, :testee, foreign_key: true
  end
end
