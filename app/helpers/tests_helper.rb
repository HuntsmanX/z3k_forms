module TestsHelper

  def show_questions_in_test(test)
    nums = test.sections.map{|section| section.questions.size }.inject(:+)
    nums ||= 0
  end

  def show_total_time(test)
    time = test.sections.map{|section| section.time_limit }.inject(:+)
    time ||= 0
  end
end
