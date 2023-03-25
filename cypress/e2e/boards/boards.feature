Feature: Boards
  Scenario: Create and delete boards
    Given I create account
      And I login
    Then I see URL "/boards"
      And I see document title "Boards"
      And I see heading "Boards"
      And I see button "Add board"
    When I click on button "Add board"
      And I get focused element
      And I type "My Board 1"
    Then I see text "Board Name"
      And I see link "Open"
      And I see button "Delete"
    When I click on button "Add board"
      And I click on button "Delete"
    Then I see text "Delete board?"
      And I see text "This action cannot be undone."
    When I find buttons by text "Delete"
      And I get last element
      And I click
      And I find links by text "Open"
    Then I count 1 element
    When I click on button "Delete"
    Then I see text "Delete board “My Board 1”?"
    When I click on button "Cancel"
    Then I see text "My Board 1"
