/**
 * nodejs esm import必须带上文件名后缀
 * https://nodejs.cn/api/esm.html#%E5%BC%BA%E5%88%B6%E6%96%87%E4%BB%B6%E6%89%A9%E5%B1%95%E5%90%8D
 */
import { writeFileSync, statSync, readdirSync, readFileSync } from "fs";
import { join, extname } from "path";

const outDir = join(__dirname, '../', 'dist/esm'); // 编译输出目录
function addJsSuffix(filePath: string) {
  const content = readFileSync(filePath, 'utf-8');
  const updatedContent = content.replace(
    /from\s+['"](\.\/[^'"]+)['"]/g,
    (match, p1) => {
      if (!p1.endsWith('.js')) return `from '${p1}.js'`;
      return match;
    }
  );
  writeFileSync(filePath, updatedContent, 'utf-8');
}

export function processDirectory(dir: string) {
  const files = readdirSync(dir);
  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      processDirectory(filePath); // 递归处理子目录
    } else if (extname(file) === '.js') {
      addJsSuffix(filePath); // 处理 .js 文件
    }
  });
}

processDirectory(outDir);
