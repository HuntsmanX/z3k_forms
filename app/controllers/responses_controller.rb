class ResponsesController < ApplicationController

  def index
    @responses = Response.all
  end

  def create
    testee = Testee.new response_params[:testee]
    if testee.save
        response = testee.responses.new
        response.duplicate_test(response_params[:test_id])
    end
  end

  private
  def response_params
    params.require(:response).permit(:test_id, :testee => [:name, :email, :phone])
  end
end
