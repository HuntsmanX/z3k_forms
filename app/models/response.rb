class Response < ApplicationRecord

  has_many   :sections, class_name: 'Response::Section', inverse_of: :response, dependent: :destroy
  belongs_to :testee

  validates :name, presence: true


  def duplicate_test(test_id)
    test = Test.find_by_id(test_id)
    self.name = test.name
    self.save
    duplicate_sections(test.sections) if test.sections.any?
  end


 private
  def duplicate_sections(sections)
    sections.each do |section|
    response_section = self.sections.create(title:          section.title,
                                            time_limit:     section.time_limit,
                                            description:    section.description,
                                            required_score: section.required_score)
    duplicate_questions(response_section, section.questions) if section.questions.any?
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
