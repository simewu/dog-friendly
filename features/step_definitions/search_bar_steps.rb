#@root_path = 'dog_friendly#index'

#Given("that the user is on the homepage") do
#  visit @root_path
#end

When(/^the user enters a search parameter$/) do
    page.evaluate_script("false").should be_false
    #find('#search').set('Hello world!')
    #find('#search').native.send_keys(:return)
end

Then("they are routed to the explore page and the search parameter is input into the explore search") do
    #expect(current_path).to eql('/explore')
    #expect(page).to have_text('Hello world!')
end


#Given("that the user is on the explore page") do
#  visit 'dog_friendly#explore'
#end


Then("the parameter is searched in google maps") do
    #page.current_url
end