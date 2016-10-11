class Response < ApplicationRecord

  has_many   :sections,  class_name: 'Response::Section'
  belongs_to :testee

  validates :name, presence: true


  def dublicate_test(test_id)
    test = Test.find_by_id(test_id)
    self.name = test.name
    self.save
    dublicate_sections(test.sections) if test.sections.any?
  end


 private
  def dublicate_sections(sections)
    sections.each do |section|
    response_section = self.sections.create(title:          section.title,
                                            time_limit:     section.time_limit,
                                            description:    section.description,
                                            required_score: section.required_score)
      dublicate_questions_and_options(response_section, section.questions) if section.questions.any?
    end

  end

  def dublicate_questions_and_options(response_section, questions)
      questions.each do |question|
        response_question = response_section.questions.create(question.attributes)
        question.options.each {|option| response_question.options.create(option.attributes)} if question.options.any?
      end
  end

end
