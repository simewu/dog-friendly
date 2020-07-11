
Feature: Login
  As a dog owner,
  So that I can customize my experience and quickly find what I need,
  I would like to have a login feature.
  
  Scenario: Login Form Homepage
    Given that the user is on the Homepage
    When the user clicks on the google sign in
    Then the sign in form should appear
    
  Scenario: Login Form Explore
    Given that the user is on the Explore page
    When the user clicks on the google sign in
    Then the sign in form should appear
    
  Scenario: Login Form About Us
    Given that the user is on the About Us page
    When the user clicks on the google sign in
    Then the sign in form should appear
    
  Scenario: User Login
    Given that a user has a google account
    When the user clicks on the google sign in button
    Then they should be signed into the site using their Google account
    
  Scenario: Icon change
    When the user signs into their google account
    Then the sign in icon should be replaced with a account icon
    
  Scenario: User Sign Out
    Given that the user is signed in
    When the user clicks the sign out button
    Then the user is signed out
    
 
    

    
  