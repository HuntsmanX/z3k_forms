class Test::Option < ApplicationRecord

  belongs_to :field, class_name: 'Test::Field', inverse_of: :options

  default_scope -> { order(:order_index) }

end
