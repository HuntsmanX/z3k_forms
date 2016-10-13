class TesteesController < ApplicationController
  skip_before_action  :verify_authenticity_token

  def index
    response = Testee.index(params[:resource] || :recruitment)
    render json: response
  end

  def by_name
    response = Testee.by_name(params[:name], params[:resource] || :recruitment)
    render json: response
  end

end
