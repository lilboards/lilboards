Feature: Boards
  Scenario: Create board
    Given I create account
      And I login
    Then I see URL "/boards"
      And I see text "Boards"
      And I see button "Add board"
    When I click on button "Add board"
      And I get focused element
      And I type "My Board 1"
    Then I see text "Board Name"
      And I see link "Open"
      And I see button "Delete"
    When I click on button "Add board"
      And I get focused element
      And I type "My Board 2"
    When I click on button "Delete"
      And I click on button "Delete"
    Then I do not see text "Board Name"
