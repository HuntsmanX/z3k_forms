class Test::Section < ApplicationRecord

  belongs_to :test,      class_name: 'Test',           inverse_of: :sections
  has_many   :questions, class_name: 'Test::Question', inverse_of: :section, dependent: :destroy
  has_many   :fields, through: :questions, class_name: 'Test::Field'

  enum score_units: [:points, :percent]

  validates :title, presence: true
  validates :time_limit, :required_score, numericality: true, allow_blank: true
  validate  :max_required_score

  default_scope -> { order(:order_index) }

  def max_required_score
    return unless score_units == 'percent' && required_score.to_i > 100
    errors.add :required_score, "should be less than or equal to 100%"
  end

end
