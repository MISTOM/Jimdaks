# JIMDAKS FARM FRESH

Jimdaks Farm Fresh is a comprehensive poultry management system designed to streamline operations, enhance efficiency, and improve oversight for poultry farming, specifically for broilers and layers. With modules for managing flocks, feed inventory, expenses, vaccinations, mortality, and processing, this system allows farm owners and caretakers to track every critical aspect of their farm.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Development](#development)
- [Building](#building)

## Features

- **Flock Management**: Track details of each flock, including bird type, age, breeder, number of birds, and housing assignments.
- **Feed Inventory and Usage Tracking**: Maintain a real-time inventory of different feed types. Log feed usage per flock, with auto-deduction from inventory and expense generation.
- **Vaccination Tracking and Scheduling**: Manage vaccinations for each flock with scheduled records and tracking of administered vaccines.
- **Mortality Logging**: Record daily mortality for each flock, with data stored for later analysis.
- **Processing Logs**: Keep records of birds processed for slaughter, including batch weight averages.
- **Expense Management**: Track farm expenses in categories like feed, utilities, vaccines, supplies, and labor.
- **User Roles**: Admin and caretaker roles for permissions-based access.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v20 or higher recommended)
- [MySQL](https://www.mysql.com/downloads/) for database management

### Installation

Clone this repository and install dependencies:

```bash
git clone https://github.com/MISTOM/Jimdaks
cd Jimdaks
npm install
```

Setup your environment variables:

1. Create a `.env` file in the root directory
2. Add your database connection string

```bash
DATABASE_URL="mysql://user:password@host:port/database-name"   #eg. "mysql://root:@127.0.0.1:3306/jimdaks"
SECRET_KEY="secret"
REFRESH_KEY="refresh"
RESET_KEY="reset"
BASE_URL=""
```

Generate, seed and sync database tables based on Prisma schema models [(prisma.schema)](/prisma/schema.prisma)

```bash
npx prisma migrate dev && npx prisma db seed
```

### Development

Run the app in dev mode with:

```bash
npm run dev
```

Access prisma studio to interact with the database directly

```bash
npx prisma studio
```

### Building

To create a production build and preview:

```bash
npm run build
npm run preview
```
