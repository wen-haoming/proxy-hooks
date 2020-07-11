import React from 'react';
import { computed } from '@vue/reactivity';

export function useComputed(obj: any) {
  let { value } = computed(obj);
  return value;
}
