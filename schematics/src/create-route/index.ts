import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  url,
  template,
  move,
  mergeWith,
  chain,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import * as path from 'path';

export function createRoute(options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const targetPath = path.join('src', strings.dasherize(options.name));

    const routeTemplateSource = apply(url('./files/route'), [
      template({
        ...options,
        ...strings,
      }),
      move(targetPath),
    ]);

    const dtoTemplateSource = apply(url('./files/dto'), [
      template({
        ...options,
        ...strings,
      }),
      move(path.join(targetPath, 'dto')),
    ]);

    return chain([
      mergeWith(routeTemplateSource),
      mergeWith(dtoTemplateSource),
    ]);
  };
}
