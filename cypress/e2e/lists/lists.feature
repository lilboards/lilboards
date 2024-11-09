Feature: Lists
  Scenario: Create and delete lists
    Given I create account
      And I login
    Then I see URL "/boards"
    When I click on link "Lists"
    Then I see URL "/lists"
      And I see document title "Lists"
      And I see heading "Lists"
      And I see button "Add list"
    When I click on button "Add list"
    Then I see label "List Name"
    When I get focused element
      And I type "List 1{enter}"
      And I wait 500 milliseconds
    Then I see URL contains "/lists/"
      And I see heading "List 1"
    When I go back
    Then I see URL "/lists"
      And I see link "Open"
      And I see button "Delete"
    When I click on button "Add list"
      And I find links by text "Open"
    Then I count 2 elements
    When I click on button "Delete"
    Then I see text "Delete list?"
      And I see text "This action cannot be undone."
    When I find buttons by text "Delete"
      And I get last element
      And I click
      And I find links by text "Open"
    Then I count 1 element
    When I click on button "Delete"
    Then I see text "Delete list “List 1”?"
    When I click on button "Cancel"
    Then I see text "List 1"
