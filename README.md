# UiPath Loan Operations Hub

A professional, single-page enterprise dashboard for business users to monitor and manage UiPath Maestro loan processing workflows in real-time.

[cloudflarebutton]

## Overview

The UiPath Loan Operations Hub is a dedicated enterprise dashboard designed to empower business users with real-time visibility and control over their loan processing workflows orchestrated by UiPath Maestro. This application provides a clean, corporate interface optimized for efficiency and information density, allowing operations teams to monitor, manage, and analyze loan applications with ease.

## Key Features

- **Real-time Process Monitoring**: Track all active, paused, and completed Maestro process instances for loan applications
- **Business-friendly Interface**: Clean, professional UI designed specifically for business operations teams
- **Loan Application Management**: View applicant details, loan amounts, and current processing status
- **Process Control**: Start new loan processes, pause, resume, or cancel existing instances
- **Performance Metrics**: Key performance indicators including processing times, approval rates, and application counts
- **Detailed Variable Views**: Comprehensive inspection of process variables for each loan application
- **Responsive Design**: Optimized for desktop and mobile devices

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **UiPath Integration**: @uipath/uipath-typescript SDK
- **State Management**: Zustand for client state
- **Data Fetching**: TanStack React Query for server state
- **Build Tool**: Vite
- **Deployment**: Cloudflare Pages
- **Date Handling**: date-fns
- **Icons**: Lucide React

## Prerequisites

- [Bun](https://bun.sh/) (latest version)
- Node.js 18+ (for compatibility)
- Access to UiPath Orchestrator with Maestro processes

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd uipath-loan-operations-hub
```

2. Install dependencies:
```bash
bun install
```

3. The project comes pre-configured with UiPath SDK credentials. No additional configuration is required for the demo environment.

## Development

Start the development server:
```bash
bun run dev
```

The application will be available at `http://localhost:3000`.

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build locally
- `bun run lint` - Run ESLint

## Usage

### Dashboard Overview

The main dashboard provides:

1. **Process Instances Table**: Lists all loan applications with key details:
   - Instance ID and applicant information
   - Loan amount and current status
   - Start time and last updated timestamps
   - Action buttons for process control

2. **Performance Metrics Cards**: Display critical KPIs:
   - Total loan applications
   - Applications in progress
   - Approval rates
   - Average processing times

3. **Process Controls**: 
   - Start new loan processes
   - Pause/resume active instances
   - Cancel processes when needed
   - View detailed process variables

### Key Components

- **LoanProcessHeader**: Application header with KPIs and quick actions
- **ProcessInstancesTable**: Main data table with loan application details
- **LoanMetricsCards**: Performance indicator cards
- **ProcessControlPanel**: Global process management controls
- **LoanDetailsModal**: Detailed view of process variables

## UiPath Configuration

The application is pre-configured to work with UiPath Maestro processes. Key configuration details:

- **Process Key**: `599b9069-cdaa-4cdc-87b4-9316b6b658fb`
- **Folder Key**: `14518163-647b-4f9d-a9fd-13708098ce78`

The UiPath SDK client is automatically initialized with the required credentials and connects to the staging environment.

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── uipath/          # UiPath-specific components
│   └── layout/          # Layout components
├── hooks/
│   ├── useUiPathMaestro.ts    # Maestro process hooks
│   ├── useUiPathProcesses.ts  # Process management hooks
│   └── ...              # Other UiPath service hooks
├── lib/
│   ├── uipath.ts        # UiPath SDK configuration
│   └── utils.ts         # Utility functions
└── pages/
    └── HomePage.tsx     # Main dashboard page
```

## Deployment

### Cloudflare Pages

[cloudflarebutton]

The project is optimized for deployment on Cloudflare Pages:

1. **Automatic Deployment**: Connect your repository to Cloudflare Pages for automatic deployments on push.

2. **Manual Deployment**:
```bash
bun run build
```

Upload the `dist/` directory to Cloudflare Pages or use Wrangler CLI:
```bash
bunx wrangler pages deploy dist
```

3. **Build Configuration**:
   - Build command: `bun run build`
   - Build output directory: `dist`
   - Node.js version: 18+

### Environment Variables

No environment variables are required. The application uses pre-configured UiPath credentials for the demo environment.

## Development Guidelines

### Code Standards

- Use TypeScript for all new code
- Follow React best practices and hooks patterns
- Utilize shadcn/ui components for consistent UI
- Implement proper error handling with toast notifications
- Use React Query hooks for all UiPath API interactions

### UiPath Integration Rules

1. **Always use React Query hooks** - Never call the SDK directly
2. **Handle pagination** - UiPath SDK returns paginated responses
3. **Use exact UiPath terminology** - "Process", "Task", "Queue", "Asset"
4. **Implement proper loading states** - Use provided loading and error states
5. **Never mock data** - Always use real UiPath API data

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes following the code standards
4. Test thoroughly with real UiPath data
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues related to:
- **UiPath SDK**: Refer to the official UiPath documentation
- **Application bugs**: Create an issue in this repository
- **Feature requests**: Submit an issue with detailed requirements

---

Built with ❤️ for UiPath automation teams