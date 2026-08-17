import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isGitHubPagesBuild = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.GITHUB_ACTIONS === 'true'

export default defineConfig({
  base: isGitHubPagesBuild ? '/sunqi-ai-designer-portfolio/' : '/',
  plugins: [react()],
})
