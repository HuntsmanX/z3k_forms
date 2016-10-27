class Test::Section < ApplicationRecord

  belongs_to :test,      class_name: 'Test',           inverse_of: :sections
  has_many   :questions, class_name: 'Test::Question', inverse_of: :section, dependent: :destroy

  has_many   :fields, through: :questions, class_name: 'Test::Field'

  enum required_score_units:   [:points, :percent], _prefix: true
  enum acceptable_score_units: [:points, :percent], _prefix: true
  enum show_next_section:      [:always, :score]

  validates :title,             presence: true
  validates :time_limit,        numericality: true, allow_blank: true
  validates :bonus_time,        numericality: true, allow_blank: true
  validates :questions_to_show, numericality: true, allow_blank: true
  validates :required_score,    numericality: true
  validates :acceptable_score,  numericality: true

  validate  :max_required_score

  default_scope -> { order(:order_index) }

  def max_required_score
    return unless required_score_units == 'percent' && required_score.to_i > 100
    errors.add :required_score, "should be less than or equal to 100%"
  end

end
