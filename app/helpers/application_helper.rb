module ApplicationHelper

  def page_title
    content_for(:title) ?
      "#{content_for(:title)} | Z3K Forms" :
      "Z3K Forms"
  end

end
