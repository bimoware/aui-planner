'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps, type Transition } from 'motion/react';

import {
  SlidingNumber,
  type SlidingNumberProps,
} from '@/components/animate-ui/primitives/texts/sliding-number';
import { Slot, type WithAsChild } from '@/components/animate-ui/primitives/animate/slot';
import { getStrictContext } from '@/lib/get-strict-context';
import { useControlledState } from '@/hooks/use-controlled-state';

type CounterContextType = {
  value: number;
  setValue: (value: number) => void;
};

const [CounterProvider, useCounter] =
  getStrictContext<CounterContextType>('CounterContext');

type BaseCounterProps = HTMLMotionProps<'div'> & {
  children: React.ReactNode;
  transition?: Transition;
};

type CounterControlProps = {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
};

type CounterProps = WithAsChild<BaseCounterProps & CounterControlProps>;

function Counter({
  value,
  defaultValue = 0,
  onValueChange,
  transition = { type: 'spring', bounce: 0, stiffness: 300, damping: 30 },
  asChild = false,
  ...props
}: CounterProps) {
  const [number, setNumber] = useControlledState({
    value,
    defaultValue,
    onChange: onValueChange,
  });

  const Component = asChild ? Slot : motion.div;

  return (
    <CounterProvider value={{ value: number, setValue: setNumber }}>
      <Component
        data-slot="counter"
        layout
        transition={transition}
        {...props}
      />
    </CounterProvider>
  );
}

type CounterMinusButtonProps = WithAsChild<HTMLMotionProps<'button'>>;

const CounterMinusButton = ({
  onClick,
  asChild = false,
  ...props
}: CounterMinusButtonProps) => {
  const { setValue, value } = useCounter();

  const Component = asChild ? Slot : motion.button;

  return (
    <Component
      data-slot="counter-minus-button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        setValue(value - 1);
        onClick?.(e);
      }}
      {...props}
    />
  );
};

type CounterPlusButtonProps = WithAsChild<HTMLMotionProps<'button'>>;

const CounterPlusButton = ({
  onClick,
  asChild = false,
  ...props
}: CounterPlusButtonProps) => {
  const { setValue, value } = useCounter();

  const Component = asChild ? Slot : motion.button;

  return (
    <Component
      data-slot="counter-plus-button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        setValue(value + 1);
        onClick?.(e);
      }}
      {...props}
    />
  );
};

type CounterNumberProps = Omit<SlidingNumberProps, 'number'>;

const CounterNumber = (props: CounterNumberProps) => {
  const { value } = useCounter();

  return <SlidingNumber data-slot="counter-number" number={value} {...props} />;
};

export {
  Counter,
  CounterMinusButton,
  CounterPlusButton,
  CounterNumber,
  type CounterProps,
  type CounterMinusButtonProps,
  type CounterPlusButtonProps,
  type CounterContextType,
};
