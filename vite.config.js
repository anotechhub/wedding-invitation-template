import { defineConfig } from 'vite'

const templateName = process.env.TEMPLATE_NAME || 'aurum-elegant'
const templateRoot = `./templates/${templateName}`

export default defineConfig({
    root: templateRoot,
    build: {
        outDir: `../../dist/${templateName}`,
        assetsDir: 'assets',
        emptyOutDir: true
    },
    server: {
        port: 5173,
        open: true,
        host: true
    }
})
