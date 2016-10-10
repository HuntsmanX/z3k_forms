class Test::QuestionsController < ApplicationController
  respond_to :json

  def create
    @question = Question.create question_params
    respond_with @question
  end

  def update
    @question = Question.find params[:id]
    @question.update_attributes question_params
    respond_with @question
  end

  private

  def question_params
    params.require(:question).permit(:test_id, :content, :question_type)
  end

end
