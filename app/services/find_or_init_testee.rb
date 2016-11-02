class FindOrInitTestee

  def initialize params
    @params = params
  end

  def testee
    self.send "get_#{source_type}"
  end

  private

  def get_local
    attrs = { source_type: source_type, email: email }

    Testee.find_or_initialize_by(attrs) do |t|
      t.name  = name
      t.phone = phone
    end
  end

  def get_recruitment
    attrs  = { source_type: source_type, user_id: user_id }
    testee = OpenStruct.new Testee.show(user_id, 'recruitment')

    Testee.find_or_initialize_by(attrs) do |t|
      t.name  = testee.full_name
      t.email = testee.email
      t.phone = testee.phone
    end
  end

  def method_missing name, *args, &block
    super unless @params.key?(name)
    @params[name]
  end

end
