ARG NODE_VERSION=20.10.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production
RUN npm install -g nodemon

# Working directory
WORKDIR /app

# Copy package.json
COPY package.json .

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 5000

# Run the application.
CMD npm run dev
