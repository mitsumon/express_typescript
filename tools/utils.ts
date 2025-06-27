import fs from "fs";
import path from "path";

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function lowercaseFirst(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

export function writeFile(filePath: string, content: string): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, content);

  console.log(`Craeted: ${filePath}`);
}
