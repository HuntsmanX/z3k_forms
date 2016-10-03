class Section < ApplicationRecord
belongs_to :test
has_many :questions

validates :time_for_test, numericality: true

end
