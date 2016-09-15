module TestsHelper
  def show_time_duration(test)
    test.time_for_test.present? ? test.time_for_test.to_s + ' min' : '0 min'
  end
end
