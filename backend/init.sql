-- Initialize knowledge management database
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create schemas if they don't exist
CREATE SCHEMA IF NOT EXISTS knowledge;
CREATE SCHEMA IF NOT EXISTS auth;

-- Set default schema
SET search_path TO knowledge, public;

-- Create tables will be handled by SQLAlchemy migrations
-- This script just sets up the database structure

-- Grant necessary permissions
GRANT ALL PRIVILEGES ON DATABASE knowledge_db TO postgres;
GRANT ALL PRIVILEGES ON SCHEMA knowledge TO postgres;
GRANT ALL PRIVILEGES ON SCHEMA auth TO postgres;
