class TestsController < ApplicationController

  def index
  end

  def edit
    @test = OpenStruct.new name: 'English Test #1'
  end

end
