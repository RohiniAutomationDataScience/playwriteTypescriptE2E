import fs from 'fs';
import { parse } from 'csv-parse/sync';

export type LoginRow = {
  username: string;
  password: string;
  expected: 'success' | 'fail';
  message?: string;
};

export function readCsv(path: string): LoginRow[] {
  const content = fs.readFileSync(path, 'utf8'); // needed ?
  const rows = parse(content, { columns: true, skip_empty_lines: true });
  
  // Validate schema
  return rows.filter((r: any, idx: number) => {
    if (!r.username || !r.password || !r.expected) {
      console.warn('Skipping bad row at index ${idx}:', r);
      return false;
    }
    return true;
  }) as LoginRow[];
}
