#@root_path = 'dog_friendly#index'

#Given("that the user is on the homepage") do
 # visit @root_path
#end


When(/^the user clicks the Emergency button$/) do
  click_link("Emergency") 
end

Then("they are routed to the Emergency page") do
    expect(current_path).to eql('/explore')
end

Then ("the map should render") do
  expect(page).to have_css('div#map')
end


#Then('the keyword Veterinarian should be entered into the search bar') do
#  expect(current_path).to eql('Veterinarian')
 # page.evaluate_script("false").should be_false
#end 



