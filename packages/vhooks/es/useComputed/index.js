import { computed } from '@vue/reactivity';
export function useComputed(obj) {
  var _computed = computed(obj),
    value = _computed.value;

  return value;
}
