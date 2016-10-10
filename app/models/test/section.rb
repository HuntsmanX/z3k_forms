class Test::Section < ApplicationRecord
belongs_to :test
has_many   :questions

validates :time_for_test, :required_score, numericality: true

end
