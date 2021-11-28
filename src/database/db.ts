import { Pool } from "pg";

const connectionString = 'postgres://aohuqsbj:vvpDZTHMDhQUupRwFIgFnfKC05Oc929-@motty.db.elephantsql.com/aohuqsbj'

const db = new Pool({ connectionString })

export default db;