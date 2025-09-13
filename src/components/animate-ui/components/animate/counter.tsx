import * as React from 'react';
import { PlusIcon, MinusIcon } from 'lucide-react';

import {
  Counter as CounterPrimitive,
  CounterNumber as CounterNumberPrimitive,
  CounterMinusButton as CounterMinusButtonPrimitive,
  CounterPlusButton as CounterPlusButtonPrimitive,
  type CounterProps as CounterPropsPrimitive,
} from '@/components/animate-ui/primitives/animate/counter';
import { cn } from '@/lib/utils';
import { Button } from '@/components/animate-ui/components/buttons/button';

type CounterProps = Omit<CounterPropsPrimitive, 'children' | 'asChild'>;

function Counter({ className, ...props }: CounterProps) {
  return (
    <CounterPrimitive
      className={cn('flex items-center p-1 border rounded-lg', className)}
      {...props}
    >
      <CounterMinusButtonPrimitive asChild>
        <Button size="icon-sm" variant="accent" className="rounded-sm">
          <MinusIcon className="size-4" />
        </Button>
      </CounterMinusButtonPrimitive>
      <CounterNumberPrimitive className="px-2.5" />
      <CounterPlusButtonPrimitive asChild>
        <Button size="icon-sm" variant="accent" className="rounded-sm">
          <PlusIcon className="size-4" />
        </Button>
      </CounterPlusButtonPrimitive>
    </CounterPrimitive>
  );
}

export { Counter, type CounterProps };
