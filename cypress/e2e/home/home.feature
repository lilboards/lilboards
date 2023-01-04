Feature: Home
  Scenario: Header
    Given I visit "/"
    Then I see text "Lilboards"
    When I click on link "Login"
    Then I see URL "/login"
      And I see heading "Sign In"

  Scenario: Hero
    Given I visit "/"
    Then I see heading "Create boards, columns, and items."
    When I click on link "Get started"
    Then I see URL "/login"
      And I see heading "Sign In"

  Scenario: Footer
    Given I visit "/"
    Then I see text "Copyright"
      And I see text "All rights reserved"
