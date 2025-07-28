# Production-grade NestJS API with Bitnami Node.js
FROM bitnami/node:22

# Set working directory
WORKDIR /app

# Copy package files for dependency caching
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY src/ ./src/

# Build the application and remove dev dependencies
RUN npm run build && npm prune --production

# Create uploads directory with proper permissions
RUN mkdir -p uploads/images && \
    chown -R 1001:1001 uploads

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Start the application
CMD ["node", "dist/main.js"]
