import { join } from "path";
import { parseExportScssToJsFile } from "../src/utils";
parseExportScssToJsFile(join(__dirname, "./export.scss"), join(__dirname, "./colors.ts"));
