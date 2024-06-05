# Chart Builder Application

## Introduction

Welcome to the Chart Builder application! This tool enables users to build and customize charts using datasets from the Federal Reserve System Data (FRED) website.

**Live Demo:** [Chart Builder on Vercel](https://chart-builder.vercel.app/)

## Technical Stack

This is a full-stack application with the following technologies:

- **Backend:** Next.js functions for proxying FRED API calls, utilizing the CQRS pattern.
- **Frontend:** React Single Page Application (SPA) implemented with Next.js client components.
- **Design System:** Material-UI for consistent and responsive design.
- **Unit Testing:** Jest combined with React Testing Library.
- **Integration Testing:** Cypress and Cypress Testing Library.

## Features

- **Dynamic Chart Management:** Users can add multiple charts and customize them according to their preferences.
- **Chart Configuration:** Options to select different chart types (line and bar), set titles, customize axes (intervals and labels), and style the charts (colors, line styles, bar styles).
- **Data Integration:** Fetch and visualize data from the FRED API.

## How to Use

1. **Access the Application:** Visit the app hosted on Vercel or run it locally.
2. **Add a Chart:**
   - Click the "Add Chart" button.
   - Search for any dataset from the FRED website (minimum 3 characters required to start the search).
   - Note: The FRED API response might take some time.
3. **Select a Dataset:** Choose a dataset from the dropdown.
4. **Submit the Chart:** Ensure all fields are filled properly and submit the dialog.
5. **Customize the Chart:**
   - Click on any chart to unlock the settings panel.
   - Edit the chart settings as needed.

You can add multiple charts to the application. Please note that data is not persisted; closing the browser or refreshing the page will result in data loss.

## Local Deployment

To run the project locally, follow these steps:

1. **Install Dependencies:**
   ```bash
   npm install --legacy-peer-deps
2. **Start the development server**
    ```bash
    npm run dev
3. **Navigate to app**
    Open your browser and navigate to http://localhost:3000