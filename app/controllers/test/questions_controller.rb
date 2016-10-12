class Test::QuestionsController < ApplicationController
  def create
    section = Test::Section.find_by_id(question_params[:section_id])
    question = section.questions.new(question_type: question_params[:type], score: question_params[:score], content: question_params[:content])
    if question.save
      add_options(question, question_params[:options].to_h) if question.question_type == ( 'single_choice' || 'multiple_choice' || 'empty_spaces' || 'sequence' )

    end
  end

  def add_options(question, options)
    options.each do |option|
      question.options.create(option.second)
    end
  end

  private
  def question_params
    params.require(:question).permit(:section_id, :type, :autocheck, :shortAnswer, :gapActive, :score, :paragraph,
                                     :content, options: [:content, :isCorrect])
  end
end
