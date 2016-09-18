module ApplicationHelper

  def page_title
    content_for(:title) ?
      "#{content_for(:title)} | Z3K Forms" :
      "Z3K Forms"
  end

  def horizontal_form_for object, *args, &block
    options   = args.extract_options!
    form_args = args << options.merge(builder: HorizontalForm)

    content_tag :div, class: 'callout primary' do
      form_for object, *form_args, &block
    end
  end

end
