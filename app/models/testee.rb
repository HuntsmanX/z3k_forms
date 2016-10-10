class Testee < ApplicationRecord
  enum source_type: [:staff, :recrutment, :new]
end
