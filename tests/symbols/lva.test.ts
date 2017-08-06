/*
 * SonarTS
 * Copyright (C) 2017-2017 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import * as path from "path";
import * as ts from "typescript";
import { SymbolTableBuilder } from "../../src/symbols/builder";
import { SymbolTable, UsageFlag } from "../../src/symbols/table";
import { descendants, is, FUNCTION_LIKE } from "../../src/utils/navigation";
import { parseFile } from "../../src/utils/parser";

it("linear", () => {
  const { symbols, sourceFile } = buildSymbolTable();
  // Tell Lena about rule capable of spotting something like FUNCTION_LIKE.includes(node.kind) ? casted = node as FunctionLikeDeclaration
  descendants(sourceFile)
    .filter(node => node instanceof ts.FunctionLikeDeclaration)
    .map(node => node as ts.FunctionDeclaration)
    .find(func => func.name.getText() === "linear");
  expect(symbols.getUsage(getIdentifier(sourceFile, "local")).flags).toBe(UsageFlag.DECLARATION);
});

function buildSymbolTable(): { symbols: SymbolTable; sourceFile: ts.SourceFile } {
  const { sourceFile, program } = parseFile(path.join(__dirname, "sample_lva.ts"));
  const symbols = SymbolTableBuilder.build(sourceFile, program);
  return { symbols, sourceFile };
}