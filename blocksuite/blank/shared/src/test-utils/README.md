# Blank Test Tools

## Structured Document Creation

`blank-template.ts` provides a concise way to create test documents, using a html-like syntax.

### Basic Usage

```typescript
import { blank } from '@blocksuite/blank-shared/test-utils';

// Create a simple document
const doc = blank`
  <blank-page>
    <blank-note>
      <blank-paragraph>Hello, World!</blank-paragraph>
    </blank-note>
  </blank-page>
`;
```

### Complex Structure Example

```typescript
// Create a document with multiple notes and paragraphs
const doc = blank`
  <blank-page title="My Test Page">
    <blank-note>
      <blank-paragraph>First paragraph</blank-paragraph>
      <blank-paragraph>Second paragraph</blank-paragraph>
    </blank-note>
    <blank-note>
      <blank-paragraph>Another note</blank-paragraph>
    </blank-note>
  </blank-page>
`;
```

### Application in Tests

This tool is particularly suitable for creating documents with specific structures in test cases:

```typescript
import { describe, expect, it } from 'vitest';
import { blank } from '../__tests__/utils/blank-template';

describe('My Test', () => {
  it('should correctly handle document structure', () => {
    const doc = blank`
      <blank-page>
        <blank-note>
          <blank-paragraph>Test content</blank-paragraph>
        </blank-note>
      </blank-page>
    `;

    // Get blocks
    const pages = doc.getBlocksByFlavour('blank:page');
    const notes = doc.getBlocksByFlavour('blank:note');
    const paragraphs = doc.getBlocksByFlavour('blank:paragraph');

    expect(pages.length).toBe(1);
    expect(notes.length).toBe(1);
    expect(paragraphs.length).toBe(1);

    // Perform more tests here...
  });
});
```

### Supported Block Types

Currently supports the following block types:

- `blank-page` → `blank:page`
- `blank-note` → `blank:note`
- `blank-paragraph` → `blank:paragraph`
- `blank-list` → `blank:list`
- `blank-image` → `blank:image`
