class Test::SectionsController < ApplicationController
  respond_to :json

  def create
    @section = Test::Section.new section_params
    if @section.save
      render json: { id: @section.id }
    else
      respond_with @section
    end
  end

  def update
    @section = Test::Section.find_by_id params[:id]

    if @section.update_attributes section_params
      render json: { id: @section.id }
    else
      respond_with @section
    end
  end

  def destroy
    @section = Test::Section.find_by_id params[:id]
    @section.destroy
    render json: {}
  end

  def reorder
    params[:sections_order].each do |id, index|
      Test::Section.find(id).update_attribute :order_index, index
    end
  end

  private

  def section_params
    params.require(:section).permit(
      :title,
      :description,
      :time_limit,
      :bonus_time,
      :required_score,
      :required_score_units,
      :shuffle_questions,
      :questions_to_show,
      :show_next_section,
      :acceptable_score,
      :acceptable_score_units,
      :test_id,
      :order_index
    )
  end

end
