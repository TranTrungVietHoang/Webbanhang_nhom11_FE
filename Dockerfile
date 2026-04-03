# Stage 1: Build source code
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve voi Nginx
FROM nginx:alpine
# Copy file build vao thu muc Mac dinh cua Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Mo port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
