import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toPascalCase(str: string): string {
  return str.split('-').map(capitalizeFirst).join('');
}

async function createMigration(migrationName: string) {
  const timestamp = Date.now();
  const className = `${timestamp}${toPascalCase(migrationName)}`;
  const migrationFileName = `${timestamp}-${migrationName}.ts`;
  const migrationPath = join(__dirname, 'db', 'migrations', migrationFileName);
  
  console.log(`Creating migration: ${migrationFileName}`);
  
  const migrationTemplate = `import { MigrationInterface, QueryRunner } from "typeorm";

export class ${className} implements MigrationInterface {
    name = '${className}'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add your migration logic here
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Add your rollback logic here
    }
}`;

  try {
    await writeFile(migrationPath, migrationTemplate);
    console.log(`✅ Migration created successfully at: ${migrationPath}`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating migration:', error);
    process.exit(1);
  }
}

// Get migration name from CLI args
const args = process.argv.slice(2);
const migrationName = args[0];

if (migrationName) {
  createMigration(migrationName);
} else {
  console.error('Usage: npm run db:create <migration-name>');
  console.error('Example: npm run db:create create-users-table');
  process.exit(1);
}

