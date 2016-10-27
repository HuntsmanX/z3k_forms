class Response::SectionsController < ApplicationController

	def edit
		@response_section = Response::Section.includes({questions: [{fields: :options}]}).friendly.find(params[:id])
	end

	def update
		response_section = Response::Section.find_by_id(params[:section][:id])
		response_section.update section_params
		response = response_section.response
		sections_ids = response.sections.pluck(:id)
		next_response_section = Response::Section.find_by_id(response_section.id + 1) if sections_ids.include? response_section.id + 1
		respond_to do |format|
			next_response_section.present? ? path = edit_response_section_path(next_response_section) : path = finish_url
    	format.json  { render json: path.to_json }
  	end
	end

	def section_params
			params.require(:section).permit(:id, :title, :time_limit,
											questions_attributes: [:id, :section_id, :content,
											fields_attributes: [:id, :field_type, :block_key,
											:user_content, :score, :autocheck, options_attributes:
											[:id, :content, :user_selected, :order_index]]])
	end
end
