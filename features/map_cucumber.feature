# feature/map_cucumber.feature

Feature: Map Cucumber
  As a developer
  So that the user can quickly navigate and find places near me,
  I would like to implement a map that shos dog friendly establishments based on my search filters.
    
  Scenario: Explore Map Render
    Given that the user is on the explore page
    Then the map should render on the explore page
  
  Scenario: Explore Map Render
    Given that the user is on the emergency page
    Then the map should render on the emergency page


    
