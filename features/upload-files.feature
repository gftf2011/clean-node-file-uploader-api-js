Feature: Upload files
  I should be able to upload files to the Back-End system

  Scenario: Upload valid .PNG file
    Given I a have the endpoint "/api/file"
    When I send the request of a "png" file
    Then I should get 201 response

  Scenario: Upload valid .JPEG file
    Given I a have the endpoint "/api/file"
    When I send the request of a "jpeg" file
    Then I should get 201 response

  Scenario: Upload valid .JPG file
    Given I a have the endpoint "/api/file"
    When I send the request of a "jpg" file
    Then I should get 201 response

  Scenario: Upload valid .GIF file
    Given I a have the endpoint "/api/file"
    When I send the request of a "gif" file
    Then I should get 201 response

  Scenario: Upload invalid JSON file
    Given I a have the endpoint "/api/file"
    When I send the request of a "json" file
    Then I should get 500 response
