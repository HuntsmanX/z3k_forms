class SectionsController < ApplicationController

  def create
    test = Test.find_by_id(params[:test_id])
    section = test.sections.new section_params
    respond_to do |format|
      if section.save
        format.json { render json: section, status: :created }
      else
        format.json { render json: section.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    def section_params
      params.require(:section).permit(:name, :time_for_test)
    end
end
