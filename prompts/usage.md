# Usage

## ⚠️ CRITICAL: UiPath SDK Type Definitions
**ALWAYS refer to the official UiPath TypeScript SDK type definitions when working with any UiPath data.**

### Type Reference Rules
1. **NEVER guess property names** - Always check the SDK types
2. **Use exact property names** from the SDK type definitions
3. **Import types** from `@uipath/uipath-typescript` for type safety

### SDK Type Reference
**📖 COMPLETE TYPE DEFINITIONS: See `UIPATH_SDK_TYPES.md` in the project root**

This file contains the OFFICIAL UiPath TypeScript SDK type definitions with:
- All interface and enum definitions
- Common property name mistakes and corrections
- Complete response type structures
- Usage examples

Key type categories:
- **Processes**: `ProcessGetResponse`, `ProcessStartRequest`, `ProcessStartResponse`
- **Tasks**: `RawTaskGetResponse`, `TaskCreateOptions`, `TaskStatus`, `TaskPriority`
- **Queues**: `QueueGetResponse`
- **Assets**: `AssetGetResponse`, `AssetValueType`
- **Maestro**: `RawMaestroProcessGetAllResponse`, `RawProcessInstanceGetResponse`, `RawCaseInstanceGetResponse`
- **Entities**: `RawEntityGetResponse`, `EntityRecord`, `FieldMetaData`
- **Buckets**: `BucketGetResponse`, `BucketGetFileMetaDataResponse`
- **Errors**: All error types extend `UiPathError`

### Always Import Types
```typescript
import type {
  ProcessGetResponse,
  RawTaskGetResponse,
  QueueGetResponse,
  AssetGetResponse
} from '@uipath/uipath-typescript';

// Then use them for type safety
const process: ProcessGetResponse = await uipath.processes.getById(123);
console.log(process.processVersion); // ✅ Correct
console.log(process.version); // ❌ TypeScript error - property doesn't exist
```

## ⚠️ CRITICAL: Using Pre-built Hooks - NEVER MOCK DATA
**This template provides React Query hooks that call the UiPath SDK directly. You MUST use these hooks and NEVER mock data.**

### Absolute Rules:
1. **NEVER create mock data** - All data MUST come from real UiPath SDK calls
2. **NEVER use placeholder/fake data** - Even during development, use real API calls
3. **NEVER create dummy/sample data objects** - Let the hooks fetch real data
4. **ALWAYS use the provided hooks** - They handle all UiPath API interactions

❌ **NEVER DO THIS:**
```typescript
// ❌ NO mock data
const mockProcesses = [
  { id: 1, name: 'Sample Process', status: 'Running' }
];

// ❌ NO fetch calls
const response = await fetch('/api/uipath/processes');

// ❌ NO hardcoded placeholder data
const [processes, setProcesses] = useState([
  { name: 'Demo Process', key: 'demo-key' }
]);
```

✅ **ALWAYS DO THIS:**
```typescript
// ✅ Use the provided hooks - they return REAL data from UiPath
import { useUiPathProcesses } from '@/hooks/useUiPathProcesses';

const { data: processes, isLoading, error } = useUiPathProcesses();
// processes contains REAL data from your UiPath environment
```

### Why No Mock Data?
- The UiPath SDK is already configured and authenticated
- All hooks are ready to use immediately
- Real data provides accurate testing
- Mock data creates false expectations and bugs

All UiPath functionality is accessible through pre-built hooks. DO NOT create fetch() calls, mock data, or API endpoints.

## Overview
UiPath Dashboard Template - Frontend-only React application with pre-configured @uipath/uipath-typescript SDK for building automation management interfaces.

- Frontend: React Router 6 + TypeScript + ShadCN UI + UiPath Components
- UiPath Integration: Pre-configured SDK client with React Query hooks
- Architecture: Pure frontend - UiPath SDK runs directly in the browser

## 🎯 UiPath SDK Integration

### Pre-configured Client
**⚠️ CRITICAL: The UiPath SDK is already configured with hardcoded credentials in `src/lib/uipath.ts`. DO NOT modify authentication or use environment variables.**

The SDK is ready to use immediately:
```typescript
import { uipath } from '@/lib/uipath';

// ✅ Ready to use - credentials are already configured!
const processes = await uipath.processes.getAll();
```

### ⛔ Authentication Rules:
1. **NEVER modify `src/lib/uipath.ts`** - Credentials are pre-configured
2. **NEVER use environment variables** - Authentication is hardcoded
3. **NEVER create a new UiPath client** - Use the exported `uipath` instance
4. **NEVER call `uipath.initialize()`** - Already initialized
5. **ALWAYS use the existing client** from `src/lib/uipath`

❌ **NEVER DO THIS:**
```typescript
// ❌ NO - Don't create a new client
import createUiPath from '@uipath/uipath-typescript';
const client = createUiPath({
  baseUrl: process.env.UIPATH_URL,
  secret: process.env.UIPATH_SECRET
});

// ❌ NO - Don't modify credentials
const uipath = createUiPath({ baseUrl: 'https://...' });

// ❌ NO - Don't use environment variables
const config = {
  secret: import.meta.env.VITE_UIPATH_SECRET
};
```

✅ **ALWAYS DO THIS:**
```typescript
// ✅ Use the pre-configured client
import { uipath } from '@/lib/uipath';

// All credentials are already set up
const data = await uipath.processes.getAll();
```

### Available React Query Hooks
**⚠️ IMPORTANT: These hooks return REAL data from your UiPath environment. NEVER create mock data - use these hooks directly.**

Use these hooks in your components for automatic caching, refetching, and loading states:

**Processes:**
- `useUiPathProcesses(folderId?)` - Get all processes
- `useUiPathProcess(processId, folderId?)` - Get specific process
- `useStartProcess()` - Mutation to start a process

**Queues:**
- `useUiPathQueues(folderId?)` - Get all queues
- `useUiPathQueue(queueId, folderId?)` - Get specific queue

**Tasks:**
- `useUiPathTasks(folderId?)` - Get all tasks
- `useAssignTask()` - Mutation to assign task
- `useCompleteTask()` - Mutation to complete task

**Assets:**
- `useUiPathAssets(folderId?)` - Get all assets
- `useUiPathAsset(assetId, folderId?)` - Get specific asset

**Maestro:**
- `useUiPathMaestroProcesses()` - Get Maestro processes
- `useUiPathMaestroInstances()` - Get process instances
- `usePauseMaestroInstance()` - Pause instance
- `useResumeMaestroInstance()` - Resume instance
- `useCancelMaestroInstance()` - Cancel instance

### Pre-built UiPath Components
Located in `src/components/uipath/`:

1. **JobStatusBadge** - Color-coded status indicators
   ```typescript
   <JobStatusBadge status="Running" />
   ```

2. **ProcessCard** - Display and start processes
   ```typescript
   <ProcessCard
     process={process}
     onStart={handleStart}
   />
   ```

3. **QueueMonitor** - Show queue statistics
   ```typescript
   <QueueMonitor queue={queue} />
   ```

4. **TaskCard** - Manage Action Center tasks
   ```typescript
   <TaskCard
     task={task}
     onAssign={handleAssign}
     onComplete={handleComplete}
   />
   ```

## 📋 Example Usage Pattern

**This example shows REAL data usage - NO mock data is created:**

```typescript
import { useUiPathProcesses, useStartProcess } from '@/hooks/useUiPathProcesses';
import { ProcessCard } from '@/components/uipath/ProcessCard';

export function MyPage() {
  // ✅ Hook fetches REAL processes from UiPath - no mock data needed
  const { data: processes, isLoading } = useUiPathProcesses();
  const { mutate: startProcess } = useStartProcess();

  if (isLoading) return <div>Loading...</div>;

  // ✅ processes contains REAL data from your UiPath Orchestrator
  return (
    <div>
      {processes?.map(process => (
        <ProcessCard
          key={process.id}
          process={process}
          onStart={(key) => startProcess({ processKey: key })}
        />
      ))}
    </div>
  );
}
```

**❌ NEVER do this:**
```typescript
// ❌ NO - Don't create mock data
const mockProcesses = [{ id: 1, name: 'Fake Process' }];

// ❌ NO - Don't use placeholder data
const [processes, setProcesses] = useState([]);
```

## 🎨 UiPath Branding
The template uses UiPath's brand colors:
- Primary Orange: `#FA4616`
- Dark Blue: `#1A1E28`

These are set as CSS variables and used throughout the components.

## Tech Stack
- React Router 6, ShadCN UI, Tailwind, Lucide, TypeScript
- @uipath/uipath-typescript SDK (runs in browser)
- @tanstack/react-query for data fetching
- date-fns for date formatting
- Vite for build tooling

## Development Restrictions

### ⛔ ABSOLUTE PROHIBITIONS:
1. **NO MOCK DATA EVER**
   - ❌ NO mock/dummy/sample/placeholder data
   - ❌ NO hardcoded data arrays or objects for UiPath entities
   - ❌ NO fake data during development or testing
   - ✅ ONLY use real data from UiPath SDK hooks

2. **NO CUSTOM API CALLS**
   - ❌ NO fetch() calls
   - ❌ NO axios calls
   - ❌ NO custom API endpoints
   - ✅ ONLY use provided React Query hooks

3. **NO CREDENTIAL MODIFICATION**
   - ❌ NO modifying `src/lib/uipath.ts` credentials
   - ❌ NO using environment variables for auth (process.env, import.meta.env)
   - ❌ NO creating new UiPath client instances
   - ❌ NO calling `uipath.initialize()` again
   - ✅ ONLY use the pre-configured `uipath` export from `src/lib/uipath`

4. **Other Restrictions**
   - **Components**: Use existing ShadCN components instead of writing custom ones
   - **Icons**: Import from `lucide-react` directly
   - **Frontend Only**: This is a pure frontend app - all UiPath API calls happen from the browser

## Code Organization

### Application Structure
- `src/lib/uipath.ts` - UiPath SDK client configuration
- `src/hooks/` - React Query hooks for UiPath services
- `src/components/uipath/` - UiPath-specific components
- `src/components/ui/` - ShadCN UI components (auto-generated)
- `src/pages/DashboardPage.tsx` - Main dashboard example

## Important Notes

### UiPath SDK Authentication
**⚠️ CRITICAL: Credentials are hardcoded in `src/lib/uipath.ts` - DO NOT modify or use environment variables.**

The SDK is already configured with these credentials in `src/lib/uipath.ts`:
- baseUrl: 'https://alpha.uipath.com'
- orgName: 'popoc'
- tenantName: 'adetenant'
- secret: 'rt_...' (PAT token)
- clientId: '6d83f733...'

**ABSOLUTE RULES:**
- ❌ **NEVER modify these credentials**
- ❌ **NEVER use environment variables** (process.env, import.meta.env, etc.)
- ❌ **NEVER create a new UiPath client instance**
- ❌ **NEVER add .env files or use dotenv**
- ✅ **ALWAYS use the existing `uipath` export** from `src/lib/uipath.ts`

These credentials are hardcoded for the demo environment and work immediately.

### Error Handling
All React Query hooks include automatic error handling with toast notifications.
Errors are displayed to users automatically.

### Polling/Refetching
- Processes: Refetch every 30 seconds
- Queues: Refetch every 10 seconds (for real-time monitoring)
- Tasks: Refetch every 15 seconds
- Maestro: Instances every 10 seconds, processes every 30 seconds

### Folder Context
Most UiPath operations support an optional `folderId` parameter to filter by Orchestrator folder.
Pass it to hooks when needed:
```typescript
const { data } = useUiPathProcesses(folderId);
```

## Extending the Template

### Adding New UiPath Services
1. Create a new hook in `src/hooks/useUiPath[Service].ts`
2. Use React Query's `useQuery` or `useMutation`
3. Import and use the `uipath` client from `src/lib/uipath`

### Adding Custom Components
1. Create component in `src/components/uipath/`
2. Use existing shadcn/ui components as building blocks
3. Follow UiPath branding guidelines (colors, typography)

### Adding New Pages
1. Create page component in `src/pages/`
2. Add route in your router configuration
3. Import and use UiPath hooks as needed

## Deployment
```bash
npm run build
```

The build creates a static site in the `dist/` directory that can be deployed to any static hosting service (Cloudflare Pages, Vercel, Netlify, etc.).
