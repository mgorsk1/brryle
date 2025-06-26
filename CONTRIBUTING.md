# Contributing to Brryle Search Application

We welcome contributions to the Brryle Search Application! By contributing, you help us improve and grow the project.

Please take a moment to review this document to understand how to contribute effectively.

## How to Contribute

### 1. Fork the Repository

First, fork the `brryle` repository to your GitHub account.

### 2. Clone Your Fork

Clone your forked repository to your local machine:

```bash
git clone https://github.com/YOUR_USERNAME/brryle.git
cd brryle
```

### 3. Create a New Branch

Create a new branch for your feature or bug fix. Use a descriptive name:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b bugfix/fix-issue-description
```

### 4. Make Your Changes

Implement your changes, ensuring they adhere to the existing code style and conventions. If you're adding new features, consider adding tests.

### 5. Test Your Changes

Before submitting a pull request, ensure your changes work as expected and do not introduce new issues. Run the existing tests (if any) and perform manual testing.

### 6. Ensure Code Quality

Before committing, run the quality checks to ensure your code adheres to the project's standards:

```bash
npm run quality
```

This command will run linting, formatting, and type checking.

### 7. Commit Your Changes

Commit your changes with a clear and concise commit message. Follow the Conventional Commits specification if possible (e.g., `feat: Add new search filter`, `fix: Resolve pagination bug`).

```bash
git add .
git commit -m "feat: Your descriptive commit message"
```

### 7. Push to Your Fork

Push your new branch to your forked repository on GitHub:

```bash
git push origin feature/your-feature-name
```

### 8. Create a Pull Request

Go to the original `brryle` repository on GitHub and create a new pull request from your pushed branch. Provide a clear description of your changes and reference any related issues.

## Code Style

-   Follow the existing TypeScript/JavaScript and React coding conventions.
-   Ensure your code is well-formatted and readable.

## Reporting Bugs

If you find a bug, please open an issue on the GitHub repository. Provide as much detail as possible, including steps to reproduce the bug, expected behavior, and actual behavior.

## Feature Requests

If you have an idea for a new feature, please open an issue to discuss it. This helps ensure that the feature aligns with the project's goals and avoids duplicate work.

Thank you for contributing to the Brryle Search Application!