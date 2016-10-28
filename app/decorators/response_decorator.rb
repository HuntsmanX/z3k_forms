module ResponseDecorator
  def show_questions_in_response
    sections.map { |s| s.questions.size }.inject(:+) || 0
  end

  def show_total_time
    limits = sections.map(&:time_limit)

    return "Unlimited" if limits.all? { |l| l.nil? || l.zero? }

    total     = limits.compact.inject(:+)
    total_str = "#{total} #{'minute'.pluralize(total)}"

    return "#{total_str} / unlimited" if limits.any? { |l| l.nil? || l.zero? }

    total_str
  end
end
