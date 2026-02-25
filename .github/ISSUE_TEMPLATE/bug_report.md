---
name: Bug Report
description: File a bug report
labels: ["bug", "triage"]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to fill out this bug report!
  - type: textarea
    id: description
    attributes:
      label: Description
      description: A clear and concise description of the bug
      placeholder: Tell us what happened...
    validations:
      required: true
  - type: textarea
    id: reproduction
    attributes:
      label: Steps to Reproduce
      description: Detailed steps to reproduce the behavior
      placeholder: |
        1. Go to '...'
        2. Click on '...'
        3. Scroll down to '...'
        4. See error
    validations:
      required: true
  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      description: What should happen?
    validations:
      required: true
  - type: textarea
    id: actual
    attributes:
      label: Actual Behavior
      description: What actually happens?
    validations:
      required: true
  - type: dropdown
    id: platform
    attributes:
      label: Platform
      options:
        - macOS
        - Windows
    validations:
      required: true
  - type: input
    id: os-version
    attributes:
      label: OS Version
      placeholder: e.g., macOS 15.3 (Sequoia) or Windows 11 24H2
    validations:
      required: true
  - type: input
    id: app-version
    attributes:
      label: App Version
      placeholder: e.g., 0.1.0
    validations:
      required: true
  - type: dropdown
    id: hardware
    attributes:
      label: Hardware
      options:
        - Apple Silicon (M1/M2/M3)
        - Intel Mac
        - Windows x64
        - Windows ARM
    validations:
      required: true
  - type: textarea
    id: logs
    attributes:
      label: Relevant Log Output
      description: Please copy and paste any relevant log output
      render: shell
  - type: textarea
    id: screenshots
    attributes:
      label: Screenshots
      description: If applicable, add screenshots to help explain your problem
  - type: textarea
    id: additional
    attributes:
      label: Additional Context
      description: Add any other context about the problem here
