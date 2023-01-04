Feature: Logout
  Scenario: Click button to logout
    Given I create account
      And I login
    Then I see URL "/boards"
    When I click on link "Logout"
    Then I see URL "/login"
      And I see heading "Sign In"
    When I visit "/boards"
    Then I see URL "/login"
      And I see heading "Sign In"

  Scenario: Visit link to logout
    Given I create account
      And I login
    Then I see URL "/boards"
    When I visit "/logout"
    Then I see URL "/login"
      And I see heading "Sign In"
    When I visit "/boards"
    Then I see URL "/login"
      And I see heading "Sign In"
