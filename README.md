# Orientational

A cross-platform class schedule viewer built with modern web technologies.

![Application Screenshot](https://s2.loli.net/2024/11/03/alJVrHBLWXMRwSk.png)

## Features

- 📅 Interactive class schedule visualization
- 🔄 Weekly/bi-weekly/tri-weekly class patterns
- 🔍 Quick class search functionality
- 💾 Local storage persistence
- 📤 Import/Export schedule data
- ⚙️ Customizable settings
- 🎨 Clean, modern UI using Fluent Design

## Tech Stack

- React 18
- TypeScript
- Vite
- Fluent UI Components
- LowDB (for local storage)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository


```bash
git clone https://github.com/yourusername/orientational.git
cd orientational
```

2. Install dependencies
```bash
yarn
```

3. Start the development server

```bash
yarn dev
```

### Building for Production

```bash
yarn build

```

## Project Structure
```
src/
├── components/
│ ├── Dialogs/ # Modal dialogs for adding/editing classes
│ ├── Home/ # Main schedule view components
│ ├── Settings/ # Application settings
│ ├── Universal/ # Reusable components
│ └── utils/ # Utility functions
├── models/ # TypeScript interfaces
├── assets/ # Static assets
└── App.tsx # Root component
```



## Features in Detail

### Class Management
- Add, edit, and delete classes
- Set class frequency (weekly, bi-weekly, tri-weekly)
- Specify room locations and instructors
- Set class duration in weeks

### Schedule View
- Grid-based weekly schedule
- Time slots from 7:00 to 23:00
- Visual indicators for class timing and frequency
- Responsive design with horizontal scrolling

### Data Management
- Persistent local storage using LowDB
- Import/Export functionality for backup and sharing
- Settings customization for semester start and duration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Fluent UI](https://react.fluentui.dev/) for the component library
- [LowDB](https://github.com/typicode/lowdb) for local storage management
- [Vite](https://vitejs.dev/) for the build tooling