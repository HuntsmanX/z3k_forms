class TestsController < ApplicationController

  def index
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

end
