class AddColumnsToTestSections < ActiveRecord::Migration[5.0]
  def change
    rename_column :test_sections, :score_units, :required_score_units

    add_column :test_sections, :bonus_time,             :integer
    add_column :test_sections, :shuffle_questions,      :boolean
    add_column :test_sections, :questions_to_show,      :integer
    add_column :test_sections, :acceptable_score,       :integer
    add_column :test_sections, :acceptable_score_units, :integer
    add_column :test_sections, :show_next_section,      :integer
  end
end
