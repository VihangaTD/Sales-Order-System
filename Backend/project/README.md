# Sales Order System

## Requirements
- Java 21
- SQL Server running on localhost

## Steps to Run

1. Create empty database:
   CREATE DATABASE SalesOrderDb;

2. Update database username and password in application.properties

3. Run backend:
   mvn spring-boot:run

4. Tables and sample data will be created automatically.

## API Documentation

- Base url: http://localhost:8080/api

## Clients APIs 

1. Get all clients : GET /api/clients

2. Get client by ID : GET /api/clients/{id}

3. Update Client : PUT /api/clients/{id}

```javascript
{
  "address1": "Updated Address",
  "address2": "Line 2",
  "address3": "",
  "suburb": "Colombo",
  "state": "Western",
  "postCode": "10100"
}
```
## Item APIs

1. Get all item : GET /api/items

2. Get item by ID : GET /api/items/{id}

3. Get item by itemCode : GET /api/items/code/{code}

4. Get item by description : GET /api/items/description/{description}

## Sales Order APIs

1. Create sales order : POST /api/orders

```javascript
{
  "clientId": 1,
  "invoiceNo": "INV-001",
  "invoiceDate": "2026-02-14",
  "referenceNo": "REF-01",
  "note": "Test order",
  "items": [
    {
      "itemId": 1,
      "quantity": 2,
      "taxRate": 10,
      "note": "Laptop order"
    },
    {
      "itemId": 2,
      "quantity": 3,
      "taxRate": 5,
      "note": "Mouse order"
    }
  ]
}
```

2. Get all orders : GET /api/orders

3. Get order by id : GET /api/orders/{id}

4. update order : PUT /api/orders/{id}

