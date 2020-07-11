# # feature/navigation_cucumber.feature

Feature: navigation bar
  As a developer
  So that the user can easily navigate to different areas of the website,
  I want the user to be able to use a navigation bar that displays the different pages on this website.
  
  Background: 
    Given that the user is on the homepage
    
  Scenario: Home route
    When the user clicks the home button
    Then they are routed to the Home page
    
  Scenario: About Us route
    When the user clicks the About Us button
    Then they are routed to the About Us page
    
  Scenario: Explore route
    When the user clicks the Explore button
    Then they are routed to the Explore page 
  
  @javascript
  Scenario: User clicks the javascript contact us button
    Given A user is on the home page
    When the user clicks the contact us button
    Then they are displayed the contact us form
    
  Scenario: Emergency route
    When the user clicks the Emergency button
    Then they are routed to the Emergency page 
  
