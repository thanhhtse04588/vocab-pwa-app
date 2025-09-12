# TextOverflow Component Usage Examples

## Basic Usage

```tsx
import TextOverflow from '@/components/TextOverflow';

// Basic usage with maxWidth
<TextOverflow maxWidth={200}>
  This is a very long text that will be truncated with ellipsis when it exceeds the maxWidth
</TextOverflow>

// With custom styling
<TextOverflow 
  maxWidth="300px" 
  color="muted" 
  size={400}
  fontWeight="bold"
  marginBottom={16}
>
  Long text with custom styling
</TextOverflow>

// With percentage width
<TextOverflow maxWidth="50%">
  Text that takes up 50% of parent width
</TextOverflow>
```

## Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `children` | `string` | The text content to display | Required |
| `maxWidth` | `number \| string` | Maximum width before truncation | Required |
| `className` | `string` | CSS class name | - |
| `color` | `string` | Text color | - |
| `size` | `number` | Font size | - |
| `fontWeight` | `string \| number` | Font weight | - |
| `margin` | `string \| number` | Margin | - |
| `marginTop` | `string \| number` | Top margin | - |
| `marginBottom` | `string \| number` | Bottom margin | - |
| `marginLeft` | `string \| number` | Left margin | - |
| `marginRight` | `string \| number` | Right margin | - |
| `textAlign` | `'left' \| 'center' \| 'right'` | Text alignment | - |
| `lineHeight` | `string \| number` | Line height | - |

## Features

- **Automatic Tooltip**: Shows full text on hover when text is truncated
- **Responsive**: Automatically detects overflow and adjusts tooltip visibility
- **Flexible Styling**: Supports all standard text styling props
- **Performance**: Only shows tooltip when text is actually overflowing
- **TypeScript**: Fully typed with proper interfaces
