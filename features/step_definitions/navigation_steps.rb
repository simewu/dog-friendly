@root_path = 'dog_friendly#index'
Given("that the user is on the homepage") do
  visit @root_path
end

When(/^the user clicks the home button$/) do
  click_link("Home") 
end

Then("they are routed to the Home page") do
    expect(current_path).to eql('/')
end


When(/^the user clicks the About Us button$/) do
  click_link("About Us") 
end

Then("they are routed to the About Us page") do
    expect(current_path).to eql('/about')
end

When(/^the user clicks the Explore button$/) do
  click_link("Explore") 
end

Then("they are routed to the Explore page") do
    expect(current_path).to eql('/explore')
end

# contact us form test
Given(/^A user is on the home page$/) do
  visit root_path
end

When(/^the user clicks the contact us button$/) do
  click_on "ze-snippet" #Is this a link or a button? # it's a button
end

Then("they are displayed the contact us form") do
    expect(page).to have_selector("input", :id =>"garden-field-container-0--input")
end


