import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  url,
  template,
  move,
  mergeWith,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import * as path from 'path';

export function createSchema(options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      template({
        ...options,
        ...strings,
      }),
      // Use relative path directly without __dirname, as the path is from the root
      move(path.join('src', 'common', 'schemas')),
    ]);

    return mergeWith(templateSource);
  };
}
