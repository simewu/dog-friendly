Feature: Contact Us Page
  As a dog owner,
  So that I can ask for help with managing my account,
  I want to be able to contact the customer service team to ask about my specific needs.
  
@javascript
Scenario: User clicks the javascript contact us button homepage
  Given A user is on the home page
  When the user clicks the contact us button
  Then they are displayed the contact us form
  
Scenario: User clicks the javascript contact us button explore page
  Given A user is on the explore page
  When the user clicks the contact us button
  Then they are displayed the contact us form

Scenario: User clicks the javascript contact us button about us page
  Given A user is on the about us page
  When the user clicks the contact us button
  Then they are displayed the contact us form
  
Scenario: Submission feedback
  Given that the contact form is pulled up
  When the user submits the form
  Then they are displayed a submission message.
  
