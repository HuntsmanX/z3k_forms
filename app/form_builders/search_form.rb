class SearchForm < ActionView::Helpers::FormBuilder

  def initialize *args
    super
    options = args.extract_options!
    @hints  = options[:hints] != false
  end

  %w{ text_field select collection_select }.each do |method_name|
    define_method method_name do |name, *args|
      options      = args.extract_options!
      render_input = -> { super(name, *args) }

      content_tag :div, class: 'form-field column' do
        concat field_label(name, options[:label])
        concat field_input(render_input, options[:hint])
      end
    end
  end

  def fieldset legend, &block
    content_tag :fieldset do
      concat content_tag(:legend, legend)
      yield
    end
  end

  def footer float = :right, &block
    content_tag :footer, class: 'clearfix' do
      content_tag :div, class: "float-#{float}" do
        yield
      end
    end
  end

  def submit name, *args
    options     = args.extract_options!
    html_class  = options[:class] || "button small"
    button_args = args << options.merge(class: html_class)

    super name, *button_args
  end

  def method_missing name, *args, &block
    @template.respond_to?(name) ? @template.send(name, *args, &block) : super
  end

  private

  def field_label name, text
    content_tag :div do
      label name.to_s.chomp("_cont"), text
    end
  end

  def field_input render_input, hint
    content_tag :div do
      if @hints
        field_input_with_hint render_input, hint
      else
        render_input.call
      end
    end
  end

  def field_input_with_hint render_input, hint
    concat(
      content_tag(:div) do
        render_input.call
      end
    )
    concat(
      content_tag(:div, class: '') do
        content_tag :label, hint, class: 'middle hint'
      end
    )
  end

end
