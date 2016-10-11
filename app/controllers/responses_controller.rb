class ResponsesController < ApplicationController

  def index
    @responses = Response.all
  end

  def create
  end

end
