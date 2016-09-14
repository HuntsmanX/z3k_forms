class TestsController < ApplicationController

  def index
    @tests = Test.all
  end

  def edit
    @test = OpenStruct.new({
      id:   1,
      name: 'English Test #1',
      questions: [
        {
          id:             1,
          test_id:        1,
          question_type:  'short_answer',
          content:        "What's your name?"
        }
      ]
    })
  end

  def create
    @test = Test.new(test_params)
    if @test.save
      redirect_to tests_path, flash: { notice: "Test Created Successfully" }
    else
      redirect_to :back , flash: { error: @test.errors.full_messages.first }
    end
  end

  def destroy
    test = Test.find_by_id(params[:id])
    test.destroy
    redirect_to tests_path, flash: { notice: "Test Deleted Successfully" }
  end

  def test_params
    params.require(:test).permit(:name, :time_for_test, :time_limit)
  end
end
