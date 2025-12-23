# Unit Test Coverage

This document provides an overview of the unit tests in the portfolio project.

## Test Statistics

- **Total Test Files**: 8
- **Total Tests**: 42 (all passing ✓)
- **Test Environment**: Vitest with browser (Playwright) and server projects

## Test Files

### Utility Tests

#### `src/lib/utils/index.test.ts` (4 tests)

Tests for date/time utility functions:

- ✓ Format epoch seconds to readable date string
- ✓ Handle zero timestamp (Unix epoch)
- ✓ Include time information in formatted output
- ✓ Handle negative timestamps

#### `src/lib/utils/chat.test.ts` (11 tests)

Tests for chat-related API utilities:

**sendChatMessage:**

- ✓ Send POST request with messages
- ✓ Include context when provided
- ✓ Throw error when response is not ok
- ✓ Throw generic error when no details provided

**uploadFile:**

- ✓ Upload file using FormData
- ✓ Throw error when upload fails
- ✓ Throw generic error when no details provided

**streamChatResponse:**

- ✓ Stream chat response chunks
- ✓ Handle invalid JSON gracefully
- ✓ Throw error when no response body
- ✓ Handle empty stream

### Component Tests

#### `src/lib/components/common/StatBadge.svelte.test.ts` (6 tests)

Tests for the StatBadge component:

- ✓ Render label and value
- ✓ Apply gradient styling when enabled
- ✓ Use default blue gradient when gradient is false
- ✓ Add data-testid when provided
- ✓ Have glass effect styling
- ✓ Render multiple badges with different values

#### `src/lib/components/ui/Navbar.svelte.test.ts` (5 tests)

Tests for the Navbar component:

- ✓ Render all navigation buttons
- ✓ Have sticky positioning
- ✓ Render navigation buttons in correct order
- ✓ Have glass effect styling
- ✓ Render with profile image preview

#### `src/lib/components/ui/Footer.svelte.test.ts` (7 tests)

Tests for the Footer component:

- ✓ Render the name correctly
- ✓ Display the current year
- ✓ Render social media links
- ✓ Have navigation links
- ✓ Have proper footer styling
- ✓ Have social links with proper aria labels
- ✓ Open external links in new tab

### API Tests

#### `src/routes/api/contact/server.test.ts` (7 tests)

Tests for the Contact API endpoint:

- ✓ Successfully send an email with valid data
- ✓ Return 400 if name is missing
- ✓ Return 400 if email is missing
- ✓ Return 400 for invalid email format
- ✓ Return 500 if Resend returns an error
- ✓ Handle unexpected errors gracefully
- ✓ Include all required email fields

### Page Tests

#### `src/routes/page.svelte.spec.ts` (1 test)

Tests for the main page:

- ✓ Render h1 element

#### `src/demo.spec.ts` (1 test)

Basic demo test:

- ✓ Basic math test (1 + 2 = 3)

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Unit Tests Only

```bash
npm run test:unit
```

### Run Unit Tests in Watch Mode

```bash
npm run test:unit -- --watch
```

### Run E2E Tests

```bash
npm run test:e2e
```

### Run Tests with Coverage

```bash
npm run test:unit -- --coverage
```

## Test Structure

### Browser Tests (Client)

- **Environment**: Chromium (via Playwright)
- **Pattern**: `*.svelte.{test,spec}.{js,ts}`
- **Purpose**: Testing Svelte components, UI interactions
- **Tools**: vitest-browser-svelte, @vitest/browser-playwright

### Server Tests

- **Environment**: Node.js
- **Pattern**: `*.{test,spec}.{js,ts}`
- **Purpose**: Testing utilities, API endpoints, server-side logic
- **Tools**: Vitest with standard Node environment

## Mock Patterns

### API Mocking

```typescript
// Mock fetch for API tests
global.fetch = vi.fn();
(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
	ok: true,
	json: async () => ({ data: 'mock data' })
});
```

### External Service Mocking

```typescript
// Mock Resend email service
const mockEmailSend = vi.fn();
vi.mock('resend', () => ({
	Resend: class Resend {
		emails = { send: mockEmailSend };
	}
}));
```

### Environment Variable Mocking

```typescript
vi.mock('$env/static/private', () => ({
	PRIVATE_API_KEY: 'test-key'
}));
```

## Component Testing Patterns

### Basic Rendering

```typescript
render(Component);
const element = page.getByTestId('my-element');
await expect.element(element).toBeInTheDocument();
```

### Props Testing

```typescript
const { container } = render(Component, {
	props: { label: 'Test', value: '123' }
});
expect(container.textContent).toContain('Test');
```

### Styling Assertions

```typescript
const element = container.querySelector('.my-class');
expect(element?.classList.contains('expected-class')).toBe(true);
```

## Coverage Goals

Current focus areas for additional tests:

- [ ] Chat component tests
- [ ] Section components (About, Skills, Experience, etc.)
- [ ] Common components (GlassCard, FeatureCard, etc.)
- [ ] API chat endpoint tests
- [ ] API upload endpoint tests
- [ ] Transition utility tests

## Best Practices

1. **Isolation**: Each test should be independent and not rely on other tests
2. **Mocking**: Mock external dependencies (APIs, services, etc.)
3. **Data-testid**: Use data-testid attributes for reliable element selection
4. **Cleanup**: Ensure proper cleanup in beforeEach/afterEach hooks
5. **Async**: Properly handle async operations with await
6. **Descriptive**: Use clear, descriptive test names
7. **Coverage**: Aim for both happy path and error cases

## Troubleshooting

### Tests not running?

- Ensure Playwright browsers are installed: `npx playwright install chromium`
- Check that vitest and dependencies are up to date

### Type errors?

- The project uses TypeScript strict mode
- Use proper type assertions or mocks
- Check that types are imported correctly

### Module resolution issues?

- Verify that path aliases in `tsconfig.json` match
- Check that mocks are properly hoisted with `vi.mock()`
