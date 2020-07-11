

Given("that the user is on the explore page") do
    visit '/explore'
end 

Then("the map should render on the explore page") do 
    expect(page).to have_css('div#map')
end 

Given("that the user is on the emergency page") do
    visit '/explore'
end 

Then("the map should render on the emergency page") do
    expect(page).to have_css('div#map')
end 