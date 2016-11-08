class ResponseDup
  attr_reader :response

  def initialize(testee, test_id)
    @response = testee.responses.new
    @test     = Test.find_by id: test_id

    duplicate_test!
  end

  private

  def duplicate_test!
     @response.name =    @test.name
     @response.test_id = @test.id
     @response.save

     duplicate_sections if @test.sections.any?
  end

  def duplicate_sections
    @test.sections.each do |section|
      response_section = response.sections.create(
        title:            section.title,
        time_limit:       section.time_limit,
        description:      section.description,
        required_score:   section.required_score,
        acceptable_score: section.acceptable_score
      )

      section_questions = get_section_questions(section)
      duplicate_questions(response_section, section_questions) if section_questions.any?
    end
  end

  def get_section_questions(section)
    questions = section.questions
    shuffle   = section.shuffle_questions
    show      = section.questions_to_show

    questions = questions.shuffle    if     shuffle
    questions = questions.take(show) unless show.nil? || show.zero?

    questions
  end

  def duplicate_questions(section, questions)
    questions.each do |q|
      response_question = section.questions.create q.attributes.except('id', 'section_id', 'created_at', 'updated_at')
      duplicate_fields(response_question, q.fields) if q.fields.any?
    end
  end

  def duplicate_fields(question, fields)
    fields.each do |field|
      response_field = question.fields.create field.attributes.except!('id', 'question_id', 'created_at', 'updated_at')
      duplicate_options(response_field, field.options) if field.options.any?
    end
  end

  def duplicate_options(field, options)
    options.shuffle.each do |option|
      field.options.create option.attributes.except!('id', 'field_id', 'created_at', 'updated_at')
    end
  end

end
