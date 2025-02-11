import { copyFileSync, mkdirSync, statSync, readdirSync } from "fs";
import { extname, join } from "path";
export function processDirectory(
  srcDir: string,
  targetDir: string
) {
  const files = readdirSync(srcDir);
  files.forEach((file) => {
    const filePath = join(srcDir, file);
    const stat = statSync(filePath);
    const temp = join(targetDir, file);
    if (stat.isDirectory()) {
      mkdirSync(temp);
      processDirectory(filePath, temp)
    } else if (extname(file) === '.scss') {
      copyFileSync(filePath, temp);
    }
  });
}
processDirectory(join(__dirname, '../', 'src'), join(__dirname, '../', 'dist'));
