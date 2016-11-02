class TestsController < ApplicationController
  before_action :authenticate_user!

  def index
    @tests = Test.with_data.page(params[:page])
  end

  def edit
    @test = Test.with_data.find(params[:id])
  end

  def create
    @test = Test.new(test_params)
    if @test.save
      redirect_to edit_test_path(@test), flash: { notice: "Test Created Successfully" }
    else
      redirect_to :back , flash: { error: @test.errors.full_messages.first }
    end
  end

  def destroy
    test = Test.find_by_id(params[:id])
    test.destroy
    redirect_to tests_path, flash: { notice: "Test Deleted Successfully" }
  end

  private
  def test_params
    params.require(:test).permit(:name, :time_for_test, :time_limit)
  end
end
