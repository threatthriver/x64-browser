---
name: Feature Request
description: Suggest an idea for this project
labels: ["enhancement", "triage"]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to suggest a feature!
  - type: textarea
    id: problem
    attributes:
      label: Problem Statement
      description: Is your feature request related to a problem?
      placeholder: I'm always frustrated when...
    validations:
      required: true
  - type: textarea
    id: proposal
    attributes:
      label: Proposed Solution
      description: Describe the solution you'd like
    validations:
      required: true
  - type: textarea
    id: alternatives
    attributes:
      label: Alternative Solutions
      description: Describe alternatives you've considered
  - type: textarea
    id: use-cases
    attributes:
      label: Use Cases
      description: Who will benefit from this feature?
    validations:
      required: true
  - type: textarea
    id: additional
    attributes:
      label: Additional Context
      description: Add any other context, mockups, or screenshots
