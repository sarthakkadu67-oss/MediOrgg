# MediOrg - Personal Health Tracker

A modern, high-performance personal health tracking application built as an assignment for the React Native Intern position. MediOrg allows users to track their daily water intake, steps, and sleep patterns with an advanced, professional UI.

## 🚀 Features

### Core Requirements Implemented
*   **Onboarding / Landing Page**: A sophisticated landing page with scroll animations, feature showcases, testimonials, and authentication (Sign Up / Login).
*   **Dashboard**:
    *   Displays current date.
    *   Summary cards for Water, Steps, and Sleep.
    *   **AI-Powered Insights**: Integrates with Google Gemini to provide daily health tips based on your logs.
    *   Visual progress bars and editing capabilities for daily goals (e.g., Water Goal).
*   **Activity Logging**:
    *   Dedicated form to log Water, Steps, and Sleep.
    *   Validation to ensure correct data entry.
    *   Option to add notes and timestamps.
*   **History**:
    *   List of past 7 days' activities.
    *   Grouped by date.
    *   **Filtering**: Filter history by specific activity type (Water, Steps, Sleep).
    *   Refresh functionality.

### Advanced UI/UX
*   **Dark Mode**: Professional "Midnight Slate" dark theme.
*   **Animations**: Smooth transitions, hover effects, parallax scrolling, and micro-interactions.
*   **Responsive Design**: Fully responsive layout that adapts from mobile to desktop screens.

## 🛠️ Tech Stack

*   **React** (TypeScript)
*   **Tailwind CSS** for styling
*   **Lucide React** for icons
*   **Recharts** for data visualization
*   **Google Gemini API** for AI insights

## 📦 Setup Instructions

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd mediorg
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory if you wish to use the AI features:
    ```
    VITE_API_KEY=your_google_gemini_api_key
    ```
    *(Note: The app runs gracefully without an API key, disabling only the AI insight feature.)*

4.  **Run the Application**
    ```bash
    npm run dev
    ```

## 📱 Screenshots

*   **Landing Page**: Features a smooth scroll reveal and auto-sliding testimonials.
*   **Dashboard**: Glassmorphism cards with real-time updates.
*   **History**: Clean, filtered lists with easy navigation.

## 👤 Author

Assignment Submission for React Native Intern Position.
