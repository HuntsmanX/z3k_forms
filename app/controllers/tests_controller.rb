class TestsController < ApplicationController

  def index
  end

  def edit
    @test = OpenStruct.new name: 'English Test #1'
  end

  def create
    @test = Test.new(test_params)
    if @test.save
      redirect_to tests_path, flash: { notice: "Test Created Successfully" }
    else
      redirect_to :back , flash: { error: @test.errors.full_messages.first }
    end
  end

  def test_params
    params.require(:test).permit(:name, :time_for_test, :time_limit)
  end
end
