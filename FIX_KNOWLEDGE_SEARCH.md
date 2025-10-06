# Knowledge Search UI Fix

## 🐛 Issue

Radix UI Select error when navigating to Knowledge Search page:
```
Uncaught Error: A <Select.Item /> must have a value prop that is not an empty string.
```

## 🔧 Fix Applied

### Problem
The Select dropdowns used empty string `""` as a value for "All Categories" and "All Levels":

```tsx
<SelectItem value="">All Categories</SelectItem>  // ❌ Not allowed
<SelectItem value="">All Levels</SelectItem>      // ❌ Not allowed
```

Radix UI reserves empty string for clearing the selection, so it cannot be used as an item value.

### Solution

Changed to use `"all"` as the placeholder value:

```tsx
<SelectItem value="all">All Categories</SelectItem>  // ✅ Valid
<SelectItem value="all">All Levels</SelectItem>      // ✅ Valid
```

### Files Changed

**`src/components/search/KnowledgeSearch.tsx`**:

1. **State initialization** (lines ~32-33):
   ```tsx
   // Before
   const [category, setCategory] = useState<string>('');
   const [difficulty, setDifficulty] = useState<string>('');
   
   // After
   const [category, setCategory] = useState<string>('all');
   const [difficulty, setDifficulty] = useState<string>('all');
   ```

2. **Select items** (lines ~157, ~171):
   ```tsx
   // Before
   <SelectItem value="">All Categories</SelectItem>
   <SelectItem value="">All Levels</SelectItem>
   
   // After
   <SelectItem value="all">All Categories</SelectItem>
   <SelectItem value="all">All Levels</SelectItem>
   ```

3. **API call filtering** (lines ~53-55):
   ```tsx
   // Before
   category: cat || undefined,
   difficulty: (diff as 'beginner' | 'intermediate' | 'advanced') || undefined,
   
   // After
   category: cat && cat !== 'all' ? cat : undefined,
   difficulty: (diff && diff !== 'all' ? diff : undefined) as 'beginner' | 'intermediate' | 'advanced' | undefined,
   ```

## ✅ Testing

After fix, the Knowledge Search page should:
- Load without errors
- Show "All Categories" and "All Levels" selected by default
- Filter correctly when changing selections
- Send no category/difficulty filters to API when "All" is selected

## 📝 Manifest Icon Warning

The manifest icon warning is unrelated to this error:
```
Error while trying to use the following icon from the Manifest: 
http://localhost:5000/icons/icon-144x144.png
```

This is a minor warning that occurs because:
- Icons exist in `public/icons/` directory
- App is running on port 5000 (likely backend proxy)
- Vite dev server typically runs on 5173

**Fix**: Run the frontend dev server on correct port:
```bash
cd c:\code\OpenAgentSchool
npm run dev
# Access at http://localhost:5173
```

If you're accessing through a proxy at port 5000, the warning is harmless and can be ignored.
