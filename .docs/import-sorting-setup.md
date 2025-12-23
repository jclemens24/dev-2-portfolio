# Import Sorting - Quick Reference

## ✅ Successfully Integrated!

Your project now has automatic import sorting configured.

## What Changed

1. **Installed**: `prettier-plugin-organize-imports`
2. **Updated**: `.prettierrc` with proper plugin order
3. **Updated**: `.vscode/settings.json` for format-on-save
4. **Added**: `format:imports` npm script
5. **Formatted**: All existing files with sorted imports

## How to Use

### Automatic (Recommended)

Just save any file in VS Code - imports will auto-sort! ✨

### Manual Commands

```bash
# Format everything (including import sorting)
npm run format

# Format only code files
npm run format:imports

# Check formatting
npm run lint
```

## Import Order (Automatic)

Your imports will be organized like this:

```typescript
// 1. Side effects (CSS, etc.)
// 3. External packages (alphabetical)
import { writable } from 'svelte/store';

// 4. Internal imports (alphabetical)
import Component from '$lib/components/Component.svelte';
import { helper } from '$lib/utils';
import { ChatOpenAI } from '@langchain/openai';
// 2. Node built-ins
import fs from 'fs';

import './styles.css';
// 5. Relative imports
import type { Props } from './types';
```

## Key Points

- ✅ Plugin order matters: `organize-imports` → `svelte` → `tailwindcss`
- ✅ Unused imports are automatically removed
- ✅ Works with TypeScript, JavaScript, and Svelte files
- ✅ Format on save is enabled in VS Code
- ✅ Compatible with your existing ESLint setup

## Need Help?

See `IMPORT_SORTING.md` for full documentation and troubleshooting.

---

**Last Updated**: December 22, 2025
