Feature: Upload files
  I should be able to upload files to the Back-End system

  Scenario: Upload valid .PNG file
    Given I a have the endpoint "/api/file"
    When I send the request with a valid "png" file
    Then I should get 201 response

  Scenario: Upload valid .JPEG file
    Given I a have the endpoint "/api/file"
    When I send the request with a valid "jpeg" file
    Then I should get 201 response

  Scenario: Upload valid .JPG file
    Given I a have the endpoint "/api/file"
    When I send the request with a valid "jpg" file
    Then I should get 201 response

  Scenario: Upload valid .GIF file
    Given I a have the endpoint "/api/file"
    When I send the request with a valid "gif" file
    Then I should get 201 response
