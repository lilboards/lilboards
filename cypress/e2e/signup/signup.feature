Feature: Signup
  Scenario: Sign up with email
    Given I visit "/login"
    Then I see document title "Login"
    When I click on button "Sign in with email"
      And I get focused element
      And I type "test@example.com"
      And I click on button "Next"
      And I get focused element
      And I type "First Last"
      And I find input by display value ""
      And I type "password"
      And I click on button "Save"
    Then I see URL "/boards"
      And I see text "verify your email"
    When I click on button "Send verification email"
    Then I see text "Email sent"
    When I verify email
      And I click on link "Logout"
    Then I see URL "/login"
      And I see text "Sign In"
    When I click on button "Sign in with email"
      And I get focused element
      And I type "test@example.com"
      And I click on button "Next"
      And I get focused element
      And I type "password"
      And I click on button "Sign In"
    Then I see URL "/boards"
      And I see text "Boards"
      And I see button "Add board"
