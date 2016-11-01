class ResponseSectionChecker

  def self.can_visit_next_section?(response_section)
    user_score = []
    response_section.questions.each do |question|
      question.fields.where(autocheck: true).each do |field|
        user_score << self.send("check_#{field.field_type}", field)
      end
    end
     (user_score.grep(Integer).reduce(:+) >= response_section.required_score)? true : false
  end

  def self.check_checkboxes(field)
    return field.score if field.options.where(is_correct: true).pluck(:user_selected).uniq.all? {|correct| correct.present?}
  end

  def self.check_dropdown(field)
    return field.score if field.options.where(is_correct: true).pluck(:user_selected).uniq.all? {|correct| correct.present?}
  end

  def self.check_text_input(field)
    return field.score if field.content == field.user_content
  end

  def self.check_text_area(field)
    return field.score if field.content == field.user_content
  end

  def self.check_sequence(field)
    return field.score if field.options.where(is_correct: true).pluck(:user_selected).uniq.all? {|correct| correct.present?}
  end

  def self.check_radio_buttons(field)
    return field.score if field.options.where(is_correct: true).pluck(:user_selected).uniq.all? {|correct| correct.present?}
  end
end
