class LabeledFormBuilder < ActionView::Helpers::FormBuilder
delegate :content_tag, :tag, to: :@template

  %w[text_field select].each do |method_name|
    define_method(method_name) do |name, *args|
      @template.content_tag :div, class: 'large-3 columns' do
        label(name) + '</div>'.html_safe + @template.tag(:div, class: 'large-9 columns') + super(name, *args)
      end
    end
  end


  def submit(label, *args)
    options = args.extract_options!
    new_class = options[:class] || "button"
    super(label, *(args << options.merge(:class => new_class)))
  end
end
