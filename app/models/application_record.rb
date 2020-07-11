#layer of the system responsible for representing business data and logic.
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
end
