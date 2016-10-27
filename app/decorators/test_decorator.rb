module TestDecorator

  def questions_count
    sections.map { |s| s.questions.size }.inject(:+) || 0
  end

  def total_time_limit
    limits = sections.map(&:time_limit)

    return "Unlimited" if limits.all? { |l| l.nil? || l.zero? }

    total     = limits.compact.inject(:+)
    total_str = "#{total} #{'minute'.pluralize(total)}"

    return "#{total_str} / unlimited" if limits.any? { |l| l.nil? || l.zero? }

    total_str
  end

  def shuffle_questions
    shuffles = sections.map(&:shuffle_questions)

    return 'Yes' if shuffles.all? { |s| s }
    return 'No'  if shuffles.all? { |s| !s }

    'Yes / No'
  end

  def max_score
    sections.map(&:questions).flatten.map(&:fields).flatten.map(&:score).inject(:+) || 0
  end

end
