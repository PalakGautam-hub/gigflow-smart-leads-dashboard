# 📖 GigFlow API Documentation

Base URL: `http://localhost:5000/api`

## Response Format

All responses follow this structure:

```json
{
  "success": true,
  "message": "Description of the result",
  "data": {},
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

## 🔐 Authentication

### Register User
```
POST /api/auth/register
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "sales"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "sales"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Login
```
POST /api/auth/login
```

**Body:**
```json
{
  "email": "admin@gigflow.com",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "name": "Admin User",
      "email": "admin@gigflow.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Get Profile
```
GET /api/auth/profile
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "id": "...",
    "name": "Admin User",
    "email": "admin@gigflow.com",
    "role": "admin"
  }
}
```

---

## 📋 Leads

> All lead endpoints require authentication via `Authorization: Bearer <token>` header.

### Get All Leads (with filters & pagination)
```
GET /api/leads?page=1&limit=10&status=New&source=Website&search=john&sort=latest
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 10 | Items per page (max 100) |
| status | string | - | Filter: New, Contacted, Qualified, Lost |
| source | string | - | Filter: Website, Instagram, Referral |
| search | string | - | Search name/email (case-insensitive) |
| sort | string | latest | Sort: latest, oldest |

**Response (200):**
```json
{
  "success": true,
  "message": "Leads retrieved successfully",
  "data": [
    {
      "_id": "...",
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "status": "New",
      "source": "Website",
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### Get Single Lead
```
GET /api/leads/:id
```

**Response (200):**
```json
{
  "success": true,
  "message": "Lead retrieved successfully",
  "data": {
    "_id": "...",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "status": "New",
    "source": "Website",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

### Create Lead
```
POST /api/leads
Authorization: Bearer <admin-token>
```

> **Requires:** Admin role

**Body:**
```json
{
  "name": "New Lead",
  "email": "newlead@example.com",
  "status": "New",
  "source": "Website"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": { ... }
}
```

### Update Lead
```
PUT /api/leads/:id
Authorization: Bearer <token>
```

> **Requires:** Admin or Sales role

**Body (all fields optional):**
```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "status": "Contacted",
  "source": "Instagram"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Lead updated successfully",
  "data": { ... }
}
```

### Delete Lead
```
DELETE /api/leads/:id
Authorization: Bearer <admin-token>
```

> **Requires:** Admin role

**Response (200):**
```json
{
  "success": true,
  "message": "Lead deleted successfully"
}
```

### Get Lead Statistics
```
GET /api/leads/stats
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Stats retrieved successfully",
  "data": {
    "total": 25,
    "new": 8,
    "contacted": 7,
    "qualified": 6,
    "lost": 4
  }
}
```

### Get Recent Leads
```
GET /api/leads/recent
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Recent leads retrieved successfully",
  "data": [ ... ]
}
```

---

## 🔍 Health Check

```
GET /api/health
```

**Response (200):**
```json
{
  "success": true,
  "message": "GigFlow API is running",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

---

## ❌ Error Responses

### 400 – Validation Error
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "body.email", "message": "Invalid email address" }
  ]
}
```

### 401 – Unauthorized
```json
{
  "success": false,
  "message": "Access token is required"
}
```

### 403 – Forbidden
```json
{
  "success": false,
  "message": "You do not have permission to perform this action"
}
```

### 404 – Not Found
```json
{
  "success": false,
  "message": "Lead not found"
}
```

### 409 – Conflict
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

### 429 – Too Many Requests
```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

### 500 – Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## 📌 Status Codes Summary

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request / Validation Error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict (duplicate) |
| 429 | Rate Limited |
| 500 | Server Error |
