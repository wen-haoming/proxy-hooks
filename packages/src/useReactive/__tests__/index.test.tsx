import React, { useEffect } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { shallow } from 'enzyme';
import { useReactive } from '../index';
import { sleep } from '../../utils/testingHelpers';

describe('useReactive', () => {
  const { result } = renderHook(() =>
    useReactive({ value: 0, val: { val: 0 } }),
  );
  test('initial value ', () => {
    expect(result.current.value).toBe(0);
    expect(result.current.val.val).toBe(0);
  });
  test('update value', () => {
    act(() => {
      result.current.value += 1;
    });
    expect(result.current.value).toBe(1);
    act(() => {
      result.current.value += 2;
    });
    expect(result.current.value).toBe(3);
    act(() => {
      result.current.val.val += 2;
    });
    expect(result.current.val.val).toBe(2);
  });

  test('test dom', async () => {
    let hook = renderHook(() =>
      useReactive({ value: '3' }, { debounce: 3000 }),
    );
    let wrap = shallow(<div>{hook.result.current.value}</div>);
    act(() => {
      hook.result.current.value = '4';
    });
    await sleep(4000);
    expect(wrap.find('div').contains('4')).toBeTruthy();
  });
});
