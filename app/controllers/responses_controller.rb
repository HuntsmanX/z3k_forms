class ResponsesController < ApplicationController

  before_action :authenticate_user!, except: [:start, :finish]
  layout 'testee', only: [:start, :finish]

  def index
    @responses = Response.all
  end

  def new
    @response = Response.new
    @response.build_testee source_type: 'recruitment'
  end

  def create
    testee = FindOrInitTestee.new(response_params[:testee]).testee

    if testee.save
      @response = ResponseDup.new(testee, response_params[:test_id]).response
      redirect_to start_path(@response.id) and return
    else
      redirect_to responses_path, alert: testee.errors.full_messages.join(', ') and return
    end
  end

  def edit
    @response = Response.find_by_id(params[:id])
  end

  def start
    @response = Response.eager_load(:testee).find_by_id(params[:id])
    sign_out current_user if current_user
    render 'responses/start'
  end

  def finish
  end

  private

  def response_params
    params.require(:response).permit(:test_id, testee: [:source_type, :user_id, :name, :email, :phone])
  end

end
