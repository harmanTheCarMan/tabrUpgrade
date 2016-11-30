const pgp = require('pg-promise')()
const db = pgp({database: 'tabr'})

const findById = `
  SELECT email, id
  FROM users
  WHERE id = $1
`

const findByEmailAndPassword = `
  SELECT email, id
  FROM users
  WHERE email=$1 AND password=$2
`

const createUser = `
  INSERT INTO users (email, password)
  VALUES( $1, $2 )
  RETURNING *
`

const createTab = `
  INSERT INTO tabs (title, user_id)
  VALUES ( $1, $2 )
  RETURNING *
`

const createTask = `
  INSERT INTO tasks (description, tab_id)
  VALUES ( $1, $2 )
  RETURNING *
`

const allTasks = `
  SELECT t.id as tabs_id, t.title, i.*
  FROM tabs t JOIN tasks i
  ON i.tab_id=t.id
  WHERE t.user_id=$1
`

const allTabsForUser = `
  SELECT *
  FROM tabs
  WHERE user_id=$1
`

const moveDown = `
  UPDATE tasks
  SET rank = rank + 1
  WHERE tab_id=$1
  AND rank=$2
`

const moveUP = `
  UPDATE tasks
  SET rank = rank -1
  WHERE tab_id=$1
  AND rank=$2
`

const setRank = `
  UPDATE tasks
  SET rank = $1
  WHERE id=$2
`

const completeTask = `
  UPDATE tasks
  SET completed = true
  WHERE id=$1
`

const uncompleteTask = `
  UPDATE tasks
  SET completed = false
  WHERE id=$1
`

const updateDescription = `
  UPDATE tasks
  SET description=$2
  WHERE id=$1
`

const deleteTab = `
  DELETE FROM tabs
  WHERE id=$1
`

const deleteTabTasks = `
  DELETE FROM tasks
  WHERE tab_id=$1
`

const deleteTask = `
  DELETE FROM tasks
  WHERE id=$1
`
