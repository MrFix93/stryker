import * as types from '@babel/types';

import { NodeGenerator } from '../helpers/NodeGenerator';
import { NodeWithParent } from '../helpers/ParentNode';

import { NodeMutator } from './NodeMutator';

export default class MethodExpressionMutator implements NodeMutator {
  public name = 'MethodExpression';

  private readonly methodsToReplace: { [targetedMethods: string]: string } = {
    endsWith: 'startsWith',
    startsWith: 'endsWith',
    trimEnd: 'trimStart',
    trimStart: 'trimEnd',
    toUpperCase: 'toLowerCase',
    toLowerCase: 'toUpperCase',
    toLocalLowerCase: 'toLocalUpperCase',
    toLocalUpperCase: 'toLocalLowerCase',
    some: 'every',
    every: 'some'
  };

  private readonly methodsToRemove: string[] = ['trim', 'substr', 'substring', 'sort', 'reverse', 'filter', 'slice', 'charAt'];

  private hasValidParent(node: NodeWithParent): boolean {
    const parent: Node = this.getParent(node);
    return types.isCallExpression(parent);
  }

  private getParent(node: NodeWithParent): types.Node | any {
    return node.parent;
  }

  public mutate(node: types.Node): Array<[types.Node, types.Node | { raw: string }]> {
    if (types.isMemberExpression(node) && this.hasValidParent(node)) {
      const methodName = node.property.name;

      if (this.methodsToRemove.includes(methodName)) {
        return [[this.getParent(node), node.object]];
      }

      const mutatedMethod = this.methodsToReplace[methodName];

      if (mutatedMethod) {
        let mutatedNode = NodeGenerator.createMutatedCloneWithProperties(node.property, { name: mutatedMethod });
        return [[node.property, mutatedNode]];
      }
    }
    return [];
  }
}
