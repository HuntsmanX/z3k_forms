class Test::QuestionsController < ApplicationController
  respond_to :json

  def create
    @question = Test::Question.new question_params
    if @question.save
      render json: question_as_json
    else
      respond_with @question
    end
  end

  def update
    @question = Test::Question.find params[:id]
    if @question.update_attributes question_params
      render json: question_as_json
    else
      respond_with @question
    end
  end

  def destroy
    @question = Test::Question.find params[:id]
    @question.destroy
    render json: {}
  end

  def reorder
    params[:questions_order].each do |id, index|
      Test::Question.find(id).update_attribute :order_index, index
    end
  end

  private

  def question_params
    params.require(:question).permit(
      :section_id, :content, :order_index,
      fields_attributes: [
        :id, :field_type, :block_key, :content, :score, :autocheck, :_destroy,
        options_attributes: [
          :id, :content, :is_correct, :_destroy, :order_index
        ]
      ]
    )
  end

  def question_as_json
    @question.as_json(include: { fields: { include: :options } })
  end

end
