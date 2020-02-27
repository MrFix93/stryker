import MethodExpressionMutatorSpec from '@stryker-mutator/mutator-specification/src/MethodExpressionSpec';

import MethodExpressionMutator from '../../../src/mutators/MethodExpressionMutator';
import { verifySpecification } from '../../helpers/mutatorAssertions';

verifySpecification(MethodExpressionMutatorSpec, MethodExpressionMutator);
