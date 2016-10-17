class Test < ApplicationRecord

  has_many :sections, class_name: 'Test::Section', inverse_of: :test, dependent: :destroy

  validates_presence_of   :name
  validates_uniqueness_of :name

  scope :with_data, -> {
    includes(sections: { questions: { fields: :options } })
  }

end
