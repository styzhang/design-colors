import sass from "sass";
import { writeFileSync } from 'fs';
import { Options } from "sass/types/options";

/**
 * @param path  scss path
 * @example
 * ":export {blue:'#1355ff';green:'#00b966'}" => { default: { blue: '#1355ff',green:'#00b966'} }
 * ":export {blue:'#1355ff';green:'#00b966'} :export[attr] {key:value}" => {default: { blue: '#1355ff',green:'#00b966'},attr:{key:value}}
 */
export function parseExportScssToObj(
  path: string,
  scssOptions?: Options<'sync'>
): Record<string, any> {
  const output = sass.compile(path, {
    sourceMap: false,
    quietDeps: true,
    verbose: false,
    // style: "compressed", // 设置compressed时部分16进制颜色值会被转换为具名颜色值，比如#808080会被转为gray
    ...scssOptions
  });
  // match ":export{xxx}" or ":export[blue]{xxx}" block
  const exportRegStr = ":export(\\[[a-zA-Z0-9_]+\\])?\\s*{\\s*([\\s\\S]*?)\\s*}";
  const match = output.css.match(new RegExp(exportRegStr, "g"));
  if (!match) {
    throw new Error(`No :export block found in the SCSS file (${output.loadedUrls[0]?.pathname}).`);
  }
  return match.reduce((acc, item) => {
    let [attr, exportBlock] = item.match(new RegExp(exportRegStr)).slice(1);
    if (attr) attr = attr.replace(/(\[)|(])/g, "");
    attr = attr || "default";
    acc[attr] = exportBlock.split(';').reduce((acc, line) => {
      line = line.trim();
      if (!line) return acc;
      let [key, value]: any = line.split(':').map(part => part.trim());
      if (/^\[[\s\S]+]$/.test(value)) {
        value = value.replace(/(\[)|(])/g, "");
        value = value.indexOf(",") !== -1 ? value.split(",") : value.split(" ");
        value = value.map(v => v.trim());
      }
      acc[key] = value;
      return acc
    }, {});
    return acc;
  }, {});
}

/**
 * @param scssPath scss export文件路径
 * @param jsFilePath 将scss export内容输出为js/ts文件路径
 */
export function parseExportScssToJsFile(
  scssPath: string,
  jsFilePath: string,
  scssOptions?: Options<'sync'>
) {
  const cssResult = parseExportScssToObj(scssPath, scssOptions);
  const isTsFile = jsFilePath.endsWith(".ts");
  let isImportTypes = false;
  let output = Object.keys(cssResult).reduce((acc, key) => {
    const jsonStr = JSON.stringify(cssResult[key], (jKey, jValue) => {
      const constVal = cssResult[key][jKey.slice(0, -5)];
      // 忽略需要export const jKey = jValue的键
      if (jKey.endsWith("Const") && typeof jValue === "string" && constVal) {
        let exportConstStr = `export const ${jValue}{0} = ${typeof constVal === 'object' ? JSON.stringify(constVal, null, 2) : constVal}\n`;
        if (Array.isArray(constVal) && constVal.length === 10) {
          exportConstStr = exportConstStr.replace("{0}", isTsFile ? ": Palette" : "");
          exportConstStr += `${jValue}.primary = ${jValue}[5];\n`;
          isImportTypes = true;
        } else{
          exportConstStr = exportConstStr.replace("{0}", "");
        }
        acc += exportConstStr;
        return undefined;
      }
      const constKey = `${jKey}Const`;
      // 打上var(xxx)标记，后续替换去掉var()&双引号指向xxx const变量
      if (cssResult[key][constKey]) return `var(${cssResult[key][constKey]})`;
      return jValue;
    }, 2).replace(/\s\s"[a-zA-Z0-9_]+":/g, (match) => { // 匹配满足指定规则的键，去除属性键上的双引号
      return match.replace(/"/g, "");
    }).replace(/"var\(([a-zA-Z0-9_]+)\)"/g, (match, p1) => { // 匹配满足指定规则的var(xxx)变量，去除var()&双引号
      return p1;
    });
    if (key === 'default') {
      acc += `export default ${jsonStr}\n`;
    } else {
      acc += `export const ${key} = ${jsonStr}\n`;
    }
    return acc;
  }, "");
  if (isImportTypes) output = "import type { Palette } from '@sdsjs/design-colors/dist/types';\n" + output;
  output = "// Generated by script. Do NOT modify!\n" + output;
  return writeFileSync(jsFilePath, output);
}
