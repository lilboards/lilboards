Feature: Board
  Scenario: Create board, columns, and items
    Given I create account
      And I login
    When I click on button "Add board"
      And I get focused element
      And I type "Create board, columns, and items"
      And I click on link "Open"
    Then I see URL contains "/boards/"
      And I see document title "Create board, columns, and items"
      And I see link "Boards"
      And I see heading "Create board, columns, and items"
      And I see button "Add column"
    When I click on button "Add column"
      And I click on button "Add item"
      And I get focused element
      And I type "Item 1 https://example.com"
      And I blur
    Then I see text "Item 1"
      And I see link "https://example.com"
    When I click on label "Delete column “Column 1”"
      And I click on button "Delete"
    Then I do not see text "Column 1"
      And I do not see text "Item 1"
    When I click on button "Add column"
      And I get focused element
      And I type "Column One"
      And I blur
    Then I see button "Add item"
    When I click on button "Add item"
      And I get focused element
      And I type "Column One, Item One"
      And I blur
    Then I see text "Column One, Item One"
      And I see text "0"
    When I click on label 'Like item "Column One, Item One"'
    Then I see text "1"
    When I click on label 'Unlike item "Column One, Item One"'
    Then I see text "0"
    When I click on label 'Like item "Column One, Item One"'
    Then I see text "1"
    When I click on button "Add column"
      And I get focused element
      And I type "Column Two"
    When I find buttons by text "Add item"
      And I get 2nd element
      And I click
      And I get focused element
      And I type "Column Two, Item One"
      And I blur
    Then I see text "Column One, Item One"
      And I see text "0"
    When I click on button "Add item"
      And I get focused element
      And I type "Item to Remove"
      And I blur
    Then I see text "Item to Remove"
    When I click on label "Delete item “Item to Remove”"
      And I click on button "Delete"
    Then I do not see text "Item to Remove"
    When I reload the page
    Then I see text "Create board, columns, and items"
      And I see text "Column One"
      And I see text "Column One, Item One"
      And I see text "Column Two"
      And I see text "Column Two, Item One"
      And I see text "1"
      And I see text "0"
      And I do not see text "Item to Delete"

  Scenario: Share board with anonymous users
    Given I create account
      And I login
    When I click on button "Add board"
      And I get focused element
      And I type "Share board with anonymous users"
      And I click on link "Open"
    Then I see text "Share board with anonymous users"
      And I see document title "Share board with anonymous users"
    When I click on button "Add column"
      And I get focused element
      And I type "Column One"
      And I click on button "Add item"
      And I get focused element
      And I type "Item One"
      And I click on label 'Like item "Item One"'
    Then I see text "Item One"
    When I copy board link
      And I click on link "Logout"
    Then I see URL "/login"
      And I see text "Sign In"
    When I visit board
    Then I see text "Share board with anonymous users"
      And I see text "Column One"
      And I see text "Item One"
      And I see button "Add item"
      And I see text "1"
      And I do not see text "Add column"
    When I click on label 'Like item "Item One"'
    Then I see text "2"
    When I click on button "Add item"
      And I get focused element
      And I type "Item Two"
      And I click on text "Hide Likes"
    Then I see text "Item Two"
    When I click on label "Delete item “Item One”"
      And I click on button "Delete"
    Then I do not see text "Item One"
