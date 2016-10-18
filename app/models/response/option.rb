class Response::Option < ApplicationRecord

  belongs_to :field, class_name: 'Response::Field', inverse_of: :options
  
end
