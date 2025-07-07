# Migration Setup Guide

## Overview

This project has been configured to use TypeORM migrations instead of `synchronize: true` for better database management in production.

## Prerequisites

Before running migrations, you need to create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USERNAME=root
MYSQL_PASSWORD=claucia
MYSQL_DATABASE=claucia

# Application Configuration
PORT=3000
NODE_ENV=development

# Throttling Configuration
THROTTLE_TTL=60000
THROTTLE_LIMIT=100
```

## Migration Commands

### Run Migrations

```bash
npm run migration:run
```

This will execute all pending migrations.

### Generate New Migration

```bash
npm run migration:generate src/migrations/MigrationName
```

This will generate a new migration by comparing your entities with the database schema.

### Create Empty Migration

```bash
npm run migration:create src/migrations/MigrationName
```

This will create an empty migration file that you can fill manually.

### Revert Last Migration

```bash
npm run migration:revert
```

This will revert the last executed migration.

## Initial Setup

1. Create the `.env` file with your database credentials
2. Ensure your MySQL database is running
3. Run the initial migration:
   ```bash
   npm run migration:run
   ```

## Important Notes

- The initial migration creates the `INTITUTION`, `PROFESSIONAL`, and `works` tables
- Migrations are run automatically when the application starts (`migrationsRun: true`)
- Always backup your database before running migrations in production
- Review generated migrations before applying them

## File Structure

```
src/
├── config/
│   └── data-source.ts          # TypeORM configuration for CLI
├── migrations/
│   └── 1734402000000-InitialMigration.ts   # Initial migration
└── modules/
    ├── institution/
    └── professional/
```
