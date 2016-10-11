test_list = %w(ExampleTest Test1 Test2 Test3 Test4 Test5)

test_list.each do |name|
  Test.create( name: name )
end

letters = [('a'..'z'), ('A'..'Z')].map { |i| i.to_a }.flatten

Test.all.each do |test|
  8.times do
    test.sections.create!( title:         (0...5).map { letters[rand(letters.length)] }.join,
                          time_limit:     rand(5..30),
                          description:    (0...10).map { letters[rand(letters.length)] }.join,
                          required_score: rand(5..30) )
  end
end
