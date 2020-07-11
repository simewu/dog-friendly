require 'rails_helper'

RSpec.describe User, :type => :model do
  
	user = User.create(password: "password", email: "john@doe.com")  
  
 
  describe "Validations" do
    it "is valid with valid attributes" do
      expect(user).to be_valid
    end

    it "is not valid without a password" do
      user.password = nil
      expect(user.password).to_not be "password"
    end

    it "is not valid without an email" do
      user.email = nil
      expect(user.email).to_not be "password"
    end
  end
end
