class Response::SectionsController < ApplicationController

	def edit
		@response_section = Response::Section.includes({questions: [{fields: :options}]}).friendly.find(params[:id])
	end

	def update
	end
end
