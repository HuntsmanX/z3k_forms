class Response::SectionsController < ApplicationController

	def edit
		@response_section = Response::Section.includes({questions: [{fields: :options}]}).friendly.find(params[:id])
	end

	def update
		response_section = Response::Section.find_by_id(params[:section][:id])
		response_section.update section_params
	end

	def section_params
			params.require(:section).permit(:id, :title, :time_limit,
											questions_attributes: [:id, :section_id, :content,
											fields_attributes: [:id, :field_type, :block_key,
											:user_content, :score, :autocheck, options_attributes:
											[:id, :content, :user_selected, :order_index]]])
	end
end
