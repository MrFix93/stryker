import { expect } from 'chai';

import ExpectMutation from './ExpectMutation';

export default function MethodExpressionMutatorSpec(name: string, expectMutation: ExpectMutation) {
  describe('MethodExpressionMutator', () => {
    it('should have name "MethodExpression"', () => {
      expect(name).eq('MethodExpression');
    });

    it('should mutate endsWith to startsWith', () => {
      expectMutation('toTest.endsWith("test")', 'toTest.startsWith("test")');
    });

    it('should mutate startsWith to endsWith', () => {
      expectMutation('toTest.startsWith("test")', 'toTest.endsWith("test")');
    });

    it('should mutate trimEnd to trimStart', () => {
      expectMutation('toTest.trimEnd()', 'toTest.trimStart()');
    });

    it('should mutate trimStart to trimEnd', () => {
      expectMutation('toTest.trimStart()', 'toTest.trimEnd()');
    });

    it('should mutate toLowerCase to toUpperCase', () => {
      expectMutation('toTest.toLowerCase()', 'toTest.toUpperCase()');
    });

    it('should mutate toUpperCase to toLowerCase', () => {
      expectMutation('toTest.toUpperCase()', 'toTest.toLowerCase()');
    });

    it('should mutate toLocalLowerCase to toLocalUpperCase', () => {
      expectMutation('toTest.toLocalLowerCase()', 'toTest.toLocalUpperCase()');
    });

    it('should mutate toLocalUpperCase to toLocalLowerCase', () => {
      expectMutation('toTest.toLocalUpperCase()', 'toTest.toLocalLowerCase()');
    });

    it('should mutate chained methods', () => {
      expectMutation(
        'toTest.toUpperCase().trimStart().startsWith("test").substring(2)',
        'toTest.toLowerCase().trimStart().startsWith("test").substring(2)',
        'toTest.toUpperCase().trimEnd().startsWith("test").substring(2)',
        'toTest.toUpperCase().trimStart().startsWith("test")',
        'toTest.toUpperCase().trimStart().endsWith("test").substring(2)'
      );
    });

    it('should mutate some to every', () => {
      expectMutation('[1, 2, 3].some(element => element % 2 === 0)', '[1, 2, 3].every(element => element % 2 === 0)');
    });

    it('should mutate every to some', () => {
      expectMutation('[1, 2, 3].every(element => element % 2 === 0)', '[1, 2, 3].some(element => element % 2 === 0)');
    });

    it('should remove trim', () => {
      expectMutation('toTest.trim();', 'toTest;');
    });

    it('should remove substr', () => {
      expectMutation('toTest.substr(1,2);', 'toTest;');
    });

    it('should remove substring', () => {
      expectMutation('toTest.substring(1,2);', 'toTest;');
    });

    it('should remove sort', () => {
      expectMutation('[1, 2, 3].sort();', '[1, 2, 3];');
    });

    it('should remove reverse', () => {
      expectMutation('[1, 2, 3].reverse();', '[1, 2, 3];');
    });

    it('should remove filter', () => {
      expectMutation('[1, 2, 3].filter(fun());', '[1, 2, 3];');
    });

    it('should remove slice from array', () => {
      expectMutation('[1, 2, 3].slice(1,2);', '[1, 2, 3];');
    });

    it('should remove slice from string', () => {
      expectMutation('"string".slice(2);', '"string";');
    });

    it('should remove charAt', () => {
      expectMutation('"string".charAt(2);', '"string";');
    });

    it('should remove methods at the end of a method chain', () => {
      expectMutation('toTest.foo("bar").filter(element => true).sort()', 'toTest.foo("bar").sort()', 'toTest.foo("bar").filter(element => true)');
    });

    it('should remove methods in the middle of a method chain', () => {
      expectMutation('toTest.trim().substring(1,2).foo("bar")', 'toTest.substring(1,2).foo("bar")', 'toTest.trim().foo("bar")');
    });

    it('should mutate methods in the middle of a method chain', () => {
      expectMutation(
        'toTest.toLocalUpperCase().startsWith("test").foo("bar")',
        'toTest.toLocalUpperCase().endsWith("test").foo("bar")',
        'toTest.toLocalLowerCase().startsWith("test").foo("bar")'
      );
    });

    it('should mutate methods at the end of a method chain', () => {
      expectMutation(
        'toTest.foo("bar").toLocalUpperCase().startsWith("test")',
        'toTest.foo("bar").toLocalUpperCase().endsWith("test")',
        'toTest.foo("bar").toLocalLowerCase().startsWith("test")'
      );
    });

    it('should not mutate variables with the same name', () => {
      expectMutation('const startsWith = {};');
    });

    it('should not remove function declarations', () => {
      expectMutation('function trim() {};');
    });

    it('should mutate function declarations', () => {
      expectMutation('function toUpperCase() {};');
    });

    it('should not mutate similar methods', () => {
      expectMutation('object.thatstartsWith();');
    });

    it('should not mutate object properties', () => {
      expectMutation('object.startsWith;');
    });
  });
}
