It is virtually impossible to list literally *every* Mongosh command, as Mongosh is a full JavaScript runtime environment. This means **any valid JavaScript code** works inside it, plus hundreds of database-specific methods, operators, and administrative commands.

However, below is the **Ultimate Mongosh Cheat Sheet**, comprehensively categorized with every command you will actually use in 99% of scenarios.

---

### 1. Connection & Navigation
```bash
# Connect to a local database
mongosh

# Connect to a specific host/port
mongosh "mongodb://localhost:27017"

# Connect with authentication
mongosh "mongodb://username:password@host:27017/dbname?authSource=admin"

# List all databases
show dbs
# or
show databases

# Switch to or create a database
use <database_name>

# List all collections in the current database
show collections
# or
show tables
```

### 2. CRUD Operations (Create, Read, Update, Delete)

#### **CREATE**
```javascript
// Insert one document
db.collection.insertOne({ name: "Alice", age: 25 })

// Insert multiple documents
db.collection.insertMany([
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 }
])
```

#### **READ**
```javascript
// Find all documents
db.collection.find()

// Find with a filter (e.g., age equals 25)
db.collection.find({ age: 25 })

// Find one document
db.collection.findOne({ name: "Alice" })

// Pretty print results
db.collection.find().pretty()

// Count documents matching a filter
db.collection.countDocuments({ age: { $gt: 20 } })

// Get an estimated count (faster, based on metadata)
db.collection.estimatedDocumentCount()

// Projection: Return only specific fields (1 = include, 0 = exclude)
db.collection.find({}, { name: 1, _id: 0 })

// Limit and Skip (Pagination)
db.collection.find().limit(10).skip(20)

// Sort (1 = ascending, -1 = descending)
db.collection.find().sort({ age: -1 })
```

#### **UPDATE**
*Note: You MUST use update operators like `$set`, otherwise the document will be replaced entirely.*
```javascript
// Update one document
db.collection.updateOne(
  { name: "Alice" },              // Filter
  { $set: { age: 26, status: "active" } } // Update
)

// Update multiple documents
db.collection.updateMany(
  { status: "pending" },
  { $set: { status: "processed" } }
)

// Replace an entire document (removes all other fields)
db.collection.replaceOne(
  { name: "Alice" },
  { fullName: "Alice Smith", age: 26 }
)

// Upsert: Insert if no document matches the filter
db.collection.updateOne(
  { name: "David" },
  { $set: { age: 40 } },
  { upsert: true }
)
```

#### **DELETE**
```javascript
// Delete one document
db.collection.deleteOne({ name: "Bob" })

// Delete multiple documents
db.collection.deleteMany({ status: "inactive" })

// Delete all documents (empties the collection, but keeps indexes)
db.collection.deleteMany({})
```

---

### 3. Update Operators (Used inside Update/FindAndModify)
```javascript
// Field Operators
$set: { field: value }         // Sets a value
$unset: { field: 1 }           // Removes a field
$rename: { oldField: "newField" } // Renames a field
$inc: { age: 1 }               // Increments by a number

// Array Operators
$push: { tags: "mongodb" }     // Appends to array
$addToSet: { tags: "mongodb" } // Appends only if it doesn't exist
$pull: { tags: "mongodb" }     // Removes all instances of a value from array
$pop: { tags: 1 }              // Removes first (-1) or last (1) element
$pullAll: { tags: ["a", "b"] } // Removes multiple values

// Array Element Update
$: { "scores.$": 100 }         // Updates the first matched element in an array
```

---

### 4. Query Operators (Used inside `find`, `update`, `delete`)
```javascript
// Comparison
$eq: 10              // Equals
$ne: 10              // Not equal
$gt: 10              // Greater than
$gte: 10             // Greater than or equal
$lt: 10              // Less than
$lte: 10             // Less than or equal
$in: [10, 20]        // Matches any value in array
$nin: [10, 20]       // Matches none of the values in array

// Logical
$and: [{ age: { $gt: 20 } }, { status: "active" }]
$or: [{ age: 20 }, { name: "Alice" }]
$not: { age: { $lt: 20 } }
$nor: [{ age: 20 }, { name: "Alice" }]

// Element
$exists: true        // Matches documents that have the field
$type: "string"      // Matches documents where field is a certain BSON type (e.g., "string", "number", "object")

// Evaluation
$regex: /pattern/    // Regular expression match
$text: { $search: "coffee" } // Full-text search (requires text index)
```

---

### 5. Aggregation Pipeline
Aggregations use an array of "stages".
```javascript
db.collection.aggregate([
  // Stage 1: Match/Filter
  { $match: { status: "active" } },
  
  // Stage 2: Group (e.g., count by category)
  { $group: { 
      _id: "$category", 
      total: { $sum: 1 }, 
      avgPrice: { $avg: "$price" } 
  }},
  
  // Stage 3: Sort results
  { $sort: { total: -1 } },
  
  // Stage 4: Limit output
  { $limit: 5 },
  
  // Stage 5: Reshape documents
  { $project: { _id: 0, category: "$_id", count: "$total" } },
  
  // Stage 6: Join with another collection
  { $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails"
  }},
  
  // Stage 7: Flatten an array
  { $unwind: "$userDetails" }
])
```
*Other common stages:* `$skip`, `$count`, `$addFields`, `$set` (alias for addFields), `$unset`, `$out` (writes to a new collection).

---

### 6. Index Management
```javascript
// Create a single field index
db.collection.createIndex({ name: 1 })

// Create a compound index
db.collection.createIndex({ lastName: 1, firstName: 1 })

// Create a unique index
db.collection.createIndex({ email: 1 }, { unique: true })

// Create a text index (for full text search)
db.collection.createIndex({ content: "text" })

// Create a TTL index (automatically deletes docs after X seconds)
db.collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })

// List all indexes on a collection
db.collection.getIndexes()

// Drop a specific index by name
db.collection.dropIndex("name_1")

// Drop all indexes (except _id)
db.collection.dropIndexes()
```

---

### 7. Collection & Database Management
```javascript
// Rename a collection
db.collection.renameCollection("new_name")

// Drop (delete) an entire collection and its indexes
db.collection.drop()

// Drop the current database
db.dropDatabase()

// Get statistics about the collection (size in bytes, doc count, etc.)
db.collection.stats()

// Convert collection to capped (fixed size)
db.command({ convertToCapped: "collection", size: 100000 })
```

---

### 8. User & Role Administration (Admin)
*You must be authenticated to the `admin` database to run these.*
```javascript
use admin

// Create a user
db.createUser({
  user: "appUser",
  pwd: passwordPrompt(), // Securely prompts for password in terminal
  roles: [
    { role: "readWrite", db: "myAppDb" },
    { role: "dbAdmin", db: "myAppDb" }
  ]
})

// Create a superuser/root
db.createUser({
  user: "admin",
  pwd: passwordPrompt(),
  roles: ["root"]
})

// Drop a user
db.dropUser("appUser")

// Grant a role to a user
db.grantRolesToUser("appUser", [{ role: "read", db: "reportingDb" }])

// Revoke a role
db.revokeRolesFromUser("appUser", [{ role: "read", db: "reportingDb" }])

// List all users in current DB
db.getUsers()
```

---

### 9. Server & Cluster Administration
```javascript
// Check server status
db.serverStatus()

// Check current database statistics
db.stats()

// See current operations running on the database
db.currentOp()

// Kill a long-running operation (use the opid from currentOp)
db.killOp(12345)

// ReplSet commands (if using a replica set)
rs.status()
rs.conf()
rs.initiate()
rs.add("host2:27017")

// Sharding commands (if using a sharded cluster)
sh.status()
sh.enableSharding("myDb")
sh.shardCollection("myDb.myCollection", { shardKey: 1 })
```

---

### 10. Mongosh-Specific Shell Helpers
Because `mongosh` is a modern Node.js/JavaScript environment, you can use native JS alongside these helpers:
```javascript
// Get help for a specific method
db.collection.find.help()

// Clear the terminal screen
cls
// or
clear

// Print something (alias for console.log)
print("Hello")

// Format a JSON object beautifully
printjson({ name: "Alice", scores: [1,2,3] })

// Use variables
let myName = "Alice"
db.collection.find({ name: myName })

// Loop through cursors
let cursor = db.collection.find()
cursor.forEach(doc => print(doc.name))

// Exit mongosh
exit
// or
quit()
// or press Ctrl+C twice
```

### Pro-Tip for learning more:
If you ever forget a command, just append `.help` to almost anything in Mongosh. For example:
* `db.help()` (Shows all database methods)
* `db.collection.help()` (Shows all collection methods)
* `db.collection.aggregate.help()` (Shows all aggregation stages)
