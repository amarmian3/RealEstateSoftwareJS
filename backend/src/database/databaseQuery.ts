import { Database } from './database';

export class DatabaseQuery {
  private db = Database.getInstance();

  constructor() {
    // you could inject the DB instance here if needed
  }

  public async runQuery(sql: string) {
    // Placeholder for actual query logic
    // Example (commented out):
    // const [results] = await this.db.query(sql, { replacements });
    // return results;
  }



  

}
