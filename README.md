# ToDo App - A Modern React Task Management Application

<div align="center">

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.9.0-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![MUI](https://img.shields.io/badge/Material_UI-7.3.4-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Testing Library](https://img.shields.io/badge/Testing_Library-E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)

A modern, feature-rich task management application built with React, TypeScript, and Material-UI. Manage your tasks
efficiently with an intuitive dark-themed interface, real-time updates, and seamless UTC time handling.

[Features](#-features) • [Installation](#-installation) • [Dependencies](#-dependencies) • [Usage](#-Usage-Guide) • [Architecture](#-architecture)

</div>

## ✨ Features

### 🎯 Core Functionality

- **CRUD Operations** - Create, read, update, and delete tasks with ease
- **Status Management** - Track task progress with three states (Todo, In Progress, Done)
- **Smart Deadlines** - Set deadlines with date and time, with automatic overdue detection
- **Detailed Views** - Click any task to see comprehensive information
- **Real-time Updates** - Instant UI updates using Redux Toolkit

### 🎨 User Interface

- **Dark Theme** - Beautiful dark mode with custom Material-UI theme
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile
- **Intuitive Navigation** - Tab-based organization (All Tasks, Active, Completed)
- **Interactive Cards** - Hover effects, status indicators, and quick actions
- **Floating Action Button** - Quick task creation always at your fingertips

### 🔧 Technical Features

- **Form Validation** - Client-side validation with helpful error messages
- **UTC Time Handling** - Automatic conversion between local time and UTC
- **Error Management** - User-friendly error notifications with auto-dismiss
- **Loading States** - Visual feedback during async operations
- **Empty States** - Helpful prompts when no tasks exist
- **Type Safety** - Full TypeScript implementation for reliability

### 📱 Dialogs & Modals

- **Create Task Dialog** - Rich form with validation and date/time picker
- **Edit Task Dialog** - Modify task details with pre-filled data
- **Delete Confirmation** - Prevent accidental deletions
- **Status Change Dialog** - Quick status updates with icon indicators
- **Task Detail View** - Comprehensive task information display

---

## 🚀 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (default: `http://localhost:5000/api`)

### Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Skiper29/ToDoApp-Client.git
   cd todoapp-client
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure environment**:
   Create a `.env` file in the root directory:
    ```env
    VITE_API_BASE_URL=https://localhost:7156/api
    ```

4. **Start development server**:
    ```bash
    npm run dev
    ```

   Open [http://localhost:5173](http://localhost:5173) (or the address shown in your terminal) to view it in the
   browser.

---

## 📦 Dependencies

### Core

- **React 19.1.1** - UI library
- **TypeScript 5.9.3** - Type safety
- **Vite 7.1.7** - Build tool and dev server

### State Management

- **Redux Toolkit 2.9.0** - Predictable state container
- **React Redux 9.2.0** - React bindings for Redux

### UI Framework

- **Material-UI (MUI) 7.3.4** - Component library
- **MUI Icons** - Icon set
- **MUI X Date Pickers** - Date/time selection
- **Emotion** - CSS-in-JS styling

### Utilities

- **Axios 1.12.2** - HTTP client
- **date-fns** - Date manipulation and formatting

---

## 🏗️ Architecture

### Project Structure

The project follows a feature-based structure to keep the code organized and scalable.

````

/src
├── api/             \# API layer (Axios instance and API calls)
├── app/             \# Redux store configuration
├── assets/          \# Static assets like images and SVGs
├── components/      \# Reusable UI components
│   ├── common/      \# Common components (e.g., ErrorSnackbar, PageHeader)
│   └── todos/       \# Components related to the 'todos' feature
├── constants/       \# Application-wide constants
├── features/        \# Redux slices for different features
│   └── todos/
├── hooks/           \# Custom React hooks
├── models/          \# TypeScript interfaces and enums
├── pages/           \# Top-level page components
├── theme/           \# MUI theme configuration
├── App.tsx          \# Main application component
└── main.tsx         \# Entry point of the application

````

### Design Patterns

#### 🎯 Component Organization

- **Common Components** - Reusable across applications
- **Specific Components** - Todo-specific functionality
- **Pages** - Top-level route components

#### 🔄 State Management Flow

```
User Action → Component → Redux Thunk → API Call → Update State → Re-render
```

#### 🕐 Time Handling

```
User Input (Local) → Convert to UTC → Send to Backend
Backend Response (UTC) → Convert to Local → Display to User
```

---

## 📖 Usage Guide

### Creating a Task

1. Click the **floating action button** (blue "+" at bottom-right)
2. Fill in the task details:
    - **Title** (required) - Up to 200 characters
    - **Description** (optional) - Up to 2000 characters
    - **Deadline** (optional) - Select date and time
3. Click **Create**

### Viewing Task Details

- Click anywhere on a **task card**
- View complete information including:
    - Full description
    - Status with icon
    - Deadline (with overdue warning if applicable)
    - Created date
    - Completion date (if done)

### Editing a Task

- **Option 1:** Click the **edit icon** on the task card
- **Option 2:** Open task details and click **Edit button**

#### Possibilities:

- Modify any field except status
- Status must be changed separately via status dialog
- Changes save immediately

### Changing Task Status

- **Option 1:** Click the **status chip** on the task card
- **Option 2:** Click the **status chip** in the detail view

Available statuses:

- 🔘 **To Do** - Task not started
- ⏰ **In Progress** - Currently working on it
- ✅ **Done** - Task completed

### Deleting a Task

- **Option 1:** Click the **delete icon** on the task card
- **Option 2:** Open task details and click **Delete button**

- Confirm deletion in the warning dialog
- Action cannot be undone

### Organizing Tasks

Use the **three tabs** to filter your view:

- **All Tasks** - See everything
- **Active** - Only Todo and In Progress
- **Completed** - Only Done tasks

---

## 🎨 Theming

The application uses Material-UI's theming capabilities. The dark theme is configured in `src/theme/theme.ts`. You can
easily customize the colors, typography, and other design tokens in this file.

## ⚙️ State Management

The application's state is managed using Redux Toolkit. The `todos` slice, located in
`src/features/todos/todosSlice.ts`, handles all state related to tasks, including asynchronous actions for fetching,
creating, updating, and deleting tasks.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 👤 Author

**Vitalii Demkiv**

- GitHub: [@Skiper29](https://github.com/Skiper29)

---

<div align="center">

**⭐ Star this repo if you find it helpful! ⭐**

Made with ❤️ and TypeScript

</div>