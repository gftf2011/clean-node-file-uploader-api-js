Feature: Upload files
  I should be able to upload files to the Back-End system

Scenario: Upload valid .PNG file
  Given I a have the endpoint "/api/file"
  When I send the request with a valid png file
  Then I should get 201 response
