class ResponsesController < ApplicationController

  def index
    @responses = Response.all
  end

  def create

    if response_params[:testee_id] && params[:testee_type] != 'local'
      testee_params = Testee.show(response_params[:testee_id], params[:testee_type])
      testee_params = { name: testee_params['full_name'], email: testee_params['email'], phone: testee_params['phone'] }
    else
      testee_params = response_params[:testee]
    end

    testee = Testee.new testee_params

    if testee.save
      response = testee.responses.new
      response.duplicate_test(response_params[:test_id])
    end
  end

  private
  def response_params
    params.require(:response).permit(:test_id, :testee_id, testee: [:name, :email, :phone])
  end
end
