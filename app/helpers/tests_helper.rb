module TestsHelper
  def show_time_duration(test)
    test.time_for_test > 0 ? test.time_for_test.to_s + ' min' : 'N/A'
  end
end
