Feature: 404
  Scenario: 404
    Given I visit "/404"
    Then I see text "Not Found"
      And I see text "Go to home"
    When I click on link "home"
    Then I see URL "/"
