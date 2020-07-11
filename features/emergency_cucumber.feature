# # feature/emergency_cucumber.feature

Feature: emergency 
  As a dog owner,
  So that I can quickly find emergency pet services,
  I would like to have an emergency button that displays all relevant emergency services near me.
  
  Background: 
    Given that the user is on the explore page
    
  Scenario: Emergency route
    When the user clicks the Emergency button
    Then they are routed to the Explore page
    
  Scenario: Map Rendered
    When the user clicks the Emergency button 
    Then the map should render 

  Scenario: Automatic search for vet
    When the user clicks the Emergency button 
    Then the keyword vet should be entered into the search bar
    