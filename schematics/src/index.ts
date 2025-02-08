import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export function mainSchematic(_options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    _context.logger.info('Welcome to my NestJS Schematics!');
    return _tree;
  };
}
