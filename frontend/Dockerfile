FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build

FROM nginx:alpine
# Create a non-root user and group
RUN addgroup -g 1000 nginxuser && \
    adduser -D -H -u 1000 -G nginxuser nginxuser && \
    chown -R nginxuser:nginxuser /var/cache/nginx && \
    chown -R nginxuser:nginxuser /var/log/nginx && \
    chown -R nginxuser:nginxuser /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginxuser:nginxuser /var/run/nginx.pid

# Copy the build files
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set proper permissions
RUN chown -R nginxuser:nginxuser /usr/share/nginx/html

EXPOSE 80
USER nginxuser
CMD ["nginx", "-g", "daemon off;"] 