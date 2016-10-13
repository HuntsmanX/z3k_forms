class Testee < ApplicationRecord

  RESOURCES = %w( recruitment staff )

  has_many :responses
  validates :email, uniqueness: true

  enum source_type: [:staff, :recruitment, :local]

  def self.index(resource, limit=1000)
    return unless RESOURCES.include?(resource.to_s)
    credentials = get_credentials(resource)
    response = RestClient.get(credentials[:url], { params: { limit: limit, auth_token: credentials[:auth_token] } })
    JSON.parse(response.body)
  end

  def self.show(id, resource)
    return unless RESOURCES.include?(resource.to_s)
    credentials = get_credentials(resource)
    response = RestClient.get(credentials[:url] + '/' + id, { params: { auth_token: credentials[:auth_token] } })
    JSON.parse(response.body)
  end

  def self.by_name(name, resource)
    return unless RESOURCES.include?(resource.to_s)
    credentials = get_credentials(resource)
    response = RestClient.post(credentials[:url], { name: name, auth_token: credentials[:auth_token] })
    JSON.parse(response.body)
  end


  private

  def self.get_credentials(resource)
    method_name = caller_locations(1,1)[0].label
    credentials = Rails.application.secrets&.[](resource)
    api = credentials&.[]('employees_api')
    result = {}

    if credentials && api
      result.merge!(url: credentials['url'] + api["#{method_name}_path"], auth_token: credentials['auth_token'])
    end

    result.with_indifferent_access
  end

end
