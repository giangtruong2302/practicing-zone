export function designURLShortener(originalUrl: string): string {
    const baseUrl = "http://short.ly/";
    const uniqueId = Math.random().toString(36).substring(2, 8);
    return baseUrl + uniqueId;
}

export function designChatApplication(): string {
    return `
    Chat Application Design:
    - Components:
        - Client (Web/Mobile)
        - Server (API)
        - Database (User data, Messages)
    - Features:
        - Real-time messaging
        - User authentication
        - Message storage
        - Notifications
    - Technologies:
        - WebSocket for real-time communication
        - Node.js for server-side
        - MongoDB for database
    `;
}