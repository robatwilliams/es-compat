import eslint from 'eslint';
import { createDelegatee, delegatingVisitor } from './delegation.js';

const ruleTester = new eslint.RuleTester();

const noVarRule = new eslint.Linter().getRules().get('no-var');

const rule = {
  create(context) {
    return delegatingVisitor([
      createDelegatee({ definition: noVarRule }, context),
      createDelegatee({ definition: noVarRule }, context),
    ]);
  },
};

ruleTester.run('allows delegatees to independently use the same AST selectors', rule, {
  valid: [],
  invalid: [
    {
      code: 'var foo;',
      errors: [
        { message: 'Unexpected var, use let or const instead.' },
        { message: 'Unexpected var, use let or const instead.' },
      ],
    },
  ],
});
