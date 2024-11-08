Feature: Boards
  Scenario: Create and delete boards
    Given I create account
      And I login
    Then I see URL "/boards"
      And I see document title "Boards"
      And I see heading "Boards"
      And I see button "Add board"
    When I click on button "Add board"
    Then I see label "Board Name"
    When I get focused element
      And I type "Board 1{enter}"
      And I wait 500 milliseconds
    Then I see URL contains "/boards/"
      And I see heading "Board 1"
    When I go back
    Then I see URL "/boards"
      And I see link "Open"
      And I see button "Delete"
    When I click on button "Add board"
      And I find links by text "Open"
    Then I count 2 elements
    When I click on button "Delete"
    Then I see text "Delete board?"
      And I see text "This action cannot be undone."
    When I find buttons by text "Delete"
      And I get last element
      And I click
      And I find links by text "Open"
    Then I count 1 element
    When I click on button "Delete"
    Then I see text "Delete board “Board 1”?"
    When I click on button "Cancel"
    Then I see text "Board 1"
