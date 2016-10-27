class Response::Section < ApplicationRecord
  extend FriendlyId
  friendly_id :uuid

  enum score_units: [:points, :percent]

  before_create :generate_uuid

  belongs_to :response, class_name: 'Response',           inverse_of: :sections
  has_many   :questions, class_name: 'Response::Question', inverse_of: :section, dependent: :destroy
  has_many   :fields, through: :questions, class_name: 'Response::Field'
  accepts_nested_attributes_for :questions, allow_destroy: true

  validates :time_limit, numericality: true

  private

  def generate_uuid
    begin
      self.uuid = SecureRandom.urlsafe_base64 8
    end while Response::Section.exists?(uuid: self.uuid)
  end

end
