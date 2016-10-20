class Test::Section < ApplicationRecord

  belongs_to :test,      class_name: 'Test',           inverse_of: :sections
  has_many   :questions, class_name: 'Test::Question', inverse_of: :section, dependent: :destroy
  has_many   :fields, through: :questions, class_name: 'Test::Field'

  enum score_units: [:points, :percent]

  validates :title, presence: true
  validates :time_limit, :required_score, numericality: true, allow_blank: true
  validate  :max_required_score

  def max_required_score
    self.class.score_units.keys.each do |key|
      self.send("validate_#{key}_required_score") if self.score_units == key
    end
  end

  private

  def validate_points_required_score
    return unless required_score.to_i > max_score
    errors.add :required_score, "should be less than or equal to max score"
  end

  def validate_percent_required_score
    return unless required_score.to_i > 100
    errors.add :required_score, "should be less than or equal to 100%"
  end

  def max_score
    fields.map(&:score).inject(:+) || 0
  end

end
