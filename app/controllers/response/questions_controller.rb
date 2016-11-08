class Response::QuestionsController < ApplicationController
  def update
    response_question = Response::Question.find_by_id(params[:id])
    render json: { id: response_question.id } if response_question.update question_params
  end

  def question_params
    params.require(:question).permit(:id, fields_attributes: [:id, :user_score])
  end
end
