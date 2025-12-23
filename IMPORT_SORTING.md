# Import Sorting Configuration

This project uses automatic import sorting with Prettier to maintain consistent import order across the codebase.

## Setup

The project uses **`prettier-plugin-organize-imports`** which leverages TypeScript's language service for intelligent import organization.

### Plugin Order (Important!)

Plugins in `.prettierrc` must be in this specific order:

```json
{
	"plugins": [
		"prettier-plugin-organize-imports", // Must be FIRST
		"prettier-plugin-svelte",
		"prettier-plugin-tailwindcss" // Must be LAST
	]
}
```

## Import Order Rules

The plugin automatically organizes imports in the following order:

1. **Side-effect imports** (e.g., `import './styles.css'`)
2. **Node built-in modules** (e.g., `import fs from 'fs'`)
3. **External packages** (e.g., `import { writable } from 'svelte/store'`)
4. **Internal/local modules** (e.g., `import Component from '$lib/components/Component.svelte'`)

Within each group, imports are sorted alphabetically.

### Example

**Before:**

```typescript
import { writable } from 'svelte/store';

import Component from '$lib/components/Component.svelte';
import { helper } from '$lib/utils';
import fs from 'fs';
import React from 'react';

import './styles.css';
```

**After:**

```typescript
import { writable } from 'svelte/store';

import Component from '$lib/components/Component.svelte';
import { helper } from '$lib/utils';
import fs from 'fs';
import React from 'react';

import './styles.css';
```

## Usage

### Automatic (Recommended)

**VS Code:** Imports are automatically sorted on save (configured in `.vscode/settings.json`)

### Manual Commands

```bash
# Format all files with import sorting
npm run format

# Format only TypeScript, JavaScript, and Svelte files
npm run format:imports

# Check formatting without modifying files
npm run lint
```

### Single File

```bash
# Format a specific file
npx prettier --write src/routes/+page.svelte
```

## IDE Setup

### VS Code

Settings are pre-configured in `.vscode/settings.json`:

- Format on save: ✅ Enabled
- Default formatter: Prettier
- Applies to: `.svelte`, `.ts`, `.js` files

### Other IDEs

1. Install Prettier extension/plugin
2. Enable format on save
3. Set Prettier as default formatter

## Troubleshooting

### Imports not sorting

1. **Check plugin order** in `.prettierrc` (organize-imports must be first)
2. **Restart your IDE** after installing the plugin
3. **Verify TypeScript config** - the plugin requires a valid `tsconfig.json`

### Conflicts with ESLint

The plugin works alongside ESLint. If you see conflicts:

- Prettier handles formatting (including import order)
- ESLint handles code quality rules

### Svelte file issues

Make sure `prettier-plugin-svelte` comes **after** `prettier-plugin-organize-imports` in the plugins array.

## How It Works

The plugin uses TypeScript's internal APIs to:

1. Parse your imports
2. Remove unused imports
3. Organize imports by type and module
4. Sort alphabetically within groups
5. Preserve comments and blank lines appropriately

## Benefits

✅ **Consistency** - No more debates about import order
✅ **Cleaner diffs** - Predictable import organization reduces merge conflicts
✅ **Automatic cleanup** - Unused imports are removed
✅ **Zero config** - Works out of the box with TypeScript projects
✅ **Fast** - Uses TypeScript's language service (no AST parsing)

## Additional Resources

- [prettier-plugin-organize-imports](https://github.com/simonhaenisch/prettier-plugin-organize-imports)
- [TypeScript Compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)
- [Prettier Plugin Docs](https://prettier.io/docs/en/plugins.html)
