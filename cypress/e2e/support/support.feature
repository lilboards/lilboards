Feature: Support
  Scenario: Support link in header
    Given I visit "/"
    Then I see label "Support"
    When I click on label "Support"
    Then I see URL "/support"
      And I see document title "Support"

  Scenario: Support page
    Given I visit "/support"
    Then I see link "issue"
      And I see link "discussion"
      And I see link "GitHub Sponsors"
      And I see link "Patreon"
      And I see link "Ko-fi"
      And I see link "Buy Me a Coffee"
      And I see link "Thanks.Dev"
      And I see link "Liberapay"
      And I see link "Teespring"
