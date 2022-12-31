Feature: Home
  Scenario: Header
    Given I visit "/"
    Then I see text "Lilboards"
      And I see text "Login"
    When I click on text "Login"
    Then I see URL "/login"
      And I see text "Sign In"

  Scenario: Hero
    Given I visit "/"
    Then I see text "Create boards, columns, and items."
      And I see text "Get started"
    When I click on text "Login"
    Then I see URL "/login"
      And I see text "Sign In"

  Scenario: Footer
    Given I visit "/"
    Then I see text "Copyright"
      And I see text "All rights reserved"
