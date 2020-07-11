#layer of the system responsible for representing business data and logic.
class User < ApplicationRecord
    
	attr_accessor :username, :email, :password
    
end
