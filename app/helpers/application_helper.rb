module ApplicationHelper

  def page_title
    content_for(:title) ?
      "#{content_for(:title)} | Z3K Forms" :
      "Z3K Forms"
  end

  def icon name
    content_tag :i, name, class: 'material-icons'
  end

  def hash key, val
    content_tag :div, class: 'row hash' do
      concat content_tag(:div, key, class: 'key')
      concat content_tag(:div, val, class: 'value')
    end
  end

  def horizontal_form_for object, *args, &block
    options   = args.extract_options!
    form_args = args << options.merge(builder: HorizontalForm)

    content_tag :div, class: 'callout primary' do
      form_for object, *form_args, &block
    end
  end

  def custom_search_form_for object, *args, &block
    options   = args.extract_options!
    form_args = args << options.merge(builder: SearchForm)

    content_tag :div, class: 'callout secondary ' do
      search_form_for object, *form_args, &block
    end
  end

  def paginator collection
    content_tag :div, class: 'clearfix paginator' do
      concat(
        content_tag(:div, class: 'float-left') do
          content_tag :div, page_entries_info(collection), class: 'entries-info'
        end
      )
      concat(
        content_tag(:div, class: 'float-right') do
          paginate collection
        end
      )
    end
  end

end
