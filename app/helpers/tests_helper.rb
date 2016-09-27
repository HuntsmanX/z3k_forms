module TestsHelper
  def show_time_duration(test)
    return 'N/A' unless test.time_limit
    "#{test.time_for_test} min"
  end
end
