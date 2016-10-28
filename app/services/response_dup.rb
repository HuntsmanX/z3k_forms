class ResponseDup
  attr_accessor :response

  def initialize(testee, test)
    @response = testee.responses.new
    duplicate_test(@response, test)
  end

  private
  def duplicate_test(response, test)
     response.name = test.name
     response.test_id = test.id
     response.save
     duplicate_sections(response, test.sections) if test.sections.any?
  end

  def duplicate_sections(response, sections)
    sections.each do |section|
    response_section = response.sections.create(title:            section.title,
                                                time_limit:       section.time_limit,
                                                description:      section.description,
                                                required_score:   section.required_score,
                                                acceptable_score: section.acceptable_score)

    section_questions = get_section_questions(section)
    duplicate_questions(response_section, section_questions) if section.questions.any?
    end
  end

  def get_section_questions(section)
    if section.questions_to_show.nil? || section.questions_to_show == 0
       section.shuffle_questions? ? section.questions.all.order('random()') : section.questions.all
    else
      section.shuffle_questions? ? section.questions.all.order('random()').limit(section.questions_to_show) : section.questions.all.limit(section.questions_to_show)
    end
  end

  def duplicate_questions(response_section, questions)
    questions.each do |question|
      response_question = response_section.questions.create(question.attributes.except!('id'))
      duplicate_fields(response_question, question.fields) if question.fields.any?
    end
  end

  def duplicate_fields(response_question, fields)
    fields.each do |field|
      response_field = response_question.fields.create(field.attributes.except!('id'))
      duplicate_options(response_field, field.options) if field.options.any?
    end
  end

  def duplicate_options(field, options)
    options.each do |option|
      field.options.create(option.attributes.except!('id'))
    end
  end
end
