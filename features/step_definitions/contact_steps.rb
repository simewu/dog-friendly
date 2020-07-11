# contact us form test
Given(/^A user is on the home page$/) do
  click_link("Home")
end

When(/^the user clicks the contact us button$/) do
  click_on "ze-snippet" #Is this a link or a button? # it's a button
end

Then("they are displayed the contact us form") do
    expect(page).to have_selector("input", :id =>"garden-field-container-0--input")
end