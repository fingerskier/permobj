module.exports = function(name='data') {
  const sql = require('sqlite3').verbose()
  
  const db = new sql.Database('data.db')
  
  let mem = {}
  
  let handler = {
    get: function(obj,prop) {
      const sql = `SELECT * FROM ${name} WHERE sort = '${prop}'`
      
      db.get(sql, (err,row)=>{
        if (err) console.error(err)
        obj[prop] = JSON.parse(row.data)
        
        return obj[prop]
      })
    },
    
    set: function(obj,prop,value) {
      obj[prop] = value
      
      const sql = `
        INSERT INTO ${name} (sort,data)
        VALUES('${prop}','${JSON.stringify(value)}')
        ON CONFLICT(sort) DO 
          UPDATE SET sort='${prop}', data='${JSON.stringify(value)}'
      `
      
      db.run(sql)
      
      return true
    }
  }
  
  let thisn = new Proxy(mem,handler)
  
  const creationQuery = `
    CREATE TABLE IF NOT EXISTS ${name} (
      sort TEXT PRIMARY KEY,
      data TEXT
    )
  `
  db.run(creationQuery)
  
  return thisn
}