Feature: 404
  Scenario: 404
    Given I visit "/404"
    Then I see document title "Not Found"
      And I see heading "Not Found"
      And I see text "Go home"
    When I click on link "home"
    Then I see URL "/"
