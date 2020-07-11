Feature: search bar
  As a dog owner,
  So that I can find dog friendly businesses specific to my area,
  I want a search bar that enables me to find the services I am in need of.
  

Scenario:
  Given that the user is on the homepage
  When the user enters a search parameter
  Then they are routed to the explore page and the search parameter is input into the explore search
  
Scenario:
  Given that the user is on the explore page
  When the user enters a search parameter
  Then the parameter is searched in google maps
  