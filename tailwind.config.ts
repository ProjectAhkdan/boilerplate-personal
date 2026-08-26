import type { Config } from 'tailwindcss';

/**
 * Tailwind CSS v4 Configuration
 *
 * Tailwind v4 uses CSS-first configuration with @theme in globals.css
 * This file is now minimal and mainly for content paths.
 *
 * @see https://tailwindcss.com/docs/v4-beta
 */
const config: Config = {
  content: [
    // App Router
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // FSD Architecture Layers
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './src/entities/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/widgets/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    // Pages Router (if exists)
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};

export default config;
