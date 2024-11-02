Feature: List
  Scenario: Create list and items
    Given I create account
      And I login
    When I click on link "Lists"
      And I click on button "Add list"
      And I get focused element
      And I type "Create list and items"
      And I click on link "Open"
    Then I see URL contains "/lists/"
      And I see document title "Create list and items"
      And I see link "Lists"
      And I see heading "Create list and items"
      And I see button "Add row"
    When I click on button "Add row"
      And I click on button "Add item"
      And I get focused element
      And I type "Item 1"
      And I blur
    Then I see text "Item 1"
    When I click on button "Delete"
    Then I see heading "Delete row?"
      And I see text "This action cannot be undone."
    When I find buttons by text "Delete"
      And I get 2nd element
      And I click
    Then I do not see text "Row 1"
      And I do not see text "Item 1"
    When I click on button "Add row"
      And I get focused element
      And I type "Row One"
      And I blur
    Then I see button "Add item"
    When I click on button "Add item"
      And I get focused element
      And I type "Row One, Item One"
      And I blur
    Then I see text "Row One, Item One"
    When I click on button "Add row"
      And I get focused element
      And I type "Row Two"
    When I find buttons by text "Add item"
      And I get 2nd element
      And I click
      And I get focused element
      And I type "Row Two, Item One"
      And I blur
    Then I see text "Row One, Item One"
    When I reload the page
    Then I see text "Create list and items"
      And I see text "Row One"
      And I see text "Row One, Item One"
      And I see text "Row Two"
      And I see text "Row Two, Item One"

  Scenario: Share list with anonymous users
    Given I create account
      And I login
    When I click on link "Lists"
      And I click on button "Add list"
      And I get focused element
      And I type "Share list with anonymous users"
      And I click on link "Open"
    Then I see text "Share list with anonymous users"
      And I see document title "Share list with anonymous users"
    When I click on button "Add row"
      And I get focused element
      And I type "Row One"
      And I click on button "Add item"
      And I get focused element
      And I type "Item One"
    Then I see text "Item One"
    When I copy list link
      And I click on link "Logout"
    Then I see URL "/login"
      And I see text "Sign In"
    When I visit list
    Then I see text "Share list with anonymous users"
      And I see text "Row One"
      And I see text "Item One"
      And I see button "Add item"
      And I do not see text "Add row"
    When I click on button "Add item"
      And I get focused element
      And I type "Item Two"
    Then I see text "Item Two"
