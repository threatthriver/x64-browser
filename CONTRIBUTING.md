# Contributing to X64 Browser

Thank you for your interest in contributing to X64 Browser! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)

---

## 🎯 Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to keep our community open, inclusive, and respectful.

---

## 🚀 Getting Started

### 1. Fork the Repository

Click the "Fork" button at the top right of the repository page.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/x64-browser.git
cd x64-browser
```

### 3. Set Up Upstream

```bash
git remote add upstream https://github.com/threatthriver/x64-browser.git
git fetch upstream
```

### 4. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-number-description
```

---

## 🛠️ Development Setup

### Prerequisites

- macOS 10.15 or later
- Node.js 18+
- Rust 1.70+
- Xcode Command Line Tools

### Install Dependencies

```bash
npm install
```

### Run Development Build

```bash
npm run tauri dev
```

### Build for Production

```bash
npm run tauri build
```

---

## 📝 Pull Request Process

### Before Submitting

1. **Test your changes** - Ensure the app builds and runs without errors
2. **Update documentation** - Update README.md if you've changed functionality
3. **Check code style** - Ensure your code follows the project's coding standards
4. **Write clear commit messages** - Follow the commit guidelines below

### PR Template

When creating a PR, please include:

- **Description**: What does this PR do?
- **Motivation**: Why is this change needed?
- **Testing**: How was this tested?
- **Screenshots**: If UI changes (before/after)
- **Related Issues**: Link any related issues

### Review Process

1. Maintainers will review your PR
2. Address any feedback or requested changes
3. Once approved, your PR will be merged

---

## 💻 Coding Standards

### TypeScript/React

- Use TypeScript for all new code
- Follow ESLint rules (coming soon)
- Use functional components with hooks
- Keep components small and focused
- Add proper type definitions

```typescript
// ✅ Good
interface Props {
  title: string;
  isActive: boolean;
}

const Tab: React.FC<Props> = ({ title, isActive }) => {
  return <div className={isActive ? 'active' : ''}>{title}</div>;
};

// ❌ Avoid
const Tab = (props) => {
  return <div>{props.title}</div>;
};
```

### Rust

- Follow Rust idioms and best practices
- Add documentation comments for public APIs
- Handle errors properly with `Result` types
- Write unit tests for new functionality

```rust
// ✅ Good
/// Creates a new tab with the given URL
/// 
/// # Arguments
/// * `url` - The initial URL to navigate to
/// 
/// # Returns
/// * `Result<TabId, TabError>` - The ID of the created tab
pub fn create_tab(&self, url: &str) -> Result<TabId, TabError> {
    // implementation
}

// ❌ Avoid
pub fn create_tab(&self, url: &str) -> TabId {
    // implementation that might fail
}
```

### CSS/Styling

- Use Tailwind CSS utility classes
- Follow the design system in [SPEC.md](SPEC.md)
- Support both light and dark modes
- Use CSS variables for theme colors

---

## 📌 Commit Guidelines

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(tabs): add drag-to-reorder functionality

Implemented drag-and-drop for tab reordering using HTML5 DnD API.

Closes #42
```

```bash
fix(navigation): prevent back button flicker on empty history

Added disabled state check before rendering back button.
```

```bash
docs(readme): update installation instructions for macOS
```

### Commit Best Practices

- Keep commits atomic and focused
- Write clear, descriptive messages
- Reference issues when applicable
- Use present tense ("add" not "added")

---

## 🐛 Reporting Bugs

### Bug Report Template

When filing a bug, please include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Detailed steps to reproduce
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**:
   - macOS version
   - App version
   - Hardware (M1/M2/Intel)
6. **Screenshots/Logs**: If applicable

---

## 💡 Feature Requests

### Feature Request Template

1. **Problem**: What problem does this solve?
2. **Proposal**: Describe your proposed feature
3. **Alternatives**: Any alternative solutions considered
4. **Use Cases**: Who will benefit from this?

---

## 📚 Additional Resources

- [SPEC.md](SPEC.md) - Full specification document
- [README.md](README.md) - Project overview
- [Tauri Documentation](https://tauri.app/v1/guides/)
- [React Documentation](https://react.dev/)

---

## 🙏 Thank You!

Every contribution makes X64 Browser better. We appreciate your time and effort!

<div align="center">

**Built with ❤️ by the X64 Browser Team**

</div>
