import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Demo from '../demo';

describe('test useMethods', () => {
  it('test count', () => {
    let wrap = render(<Demo />);
    let count = wrap.getByRole('countVal');
    let addCount = wrap.getByRole('addCount');

    act(() => {
      fireEvent.click(addCount);
    });
    expect(count.textContent).toBe('1');
  });
  it('test arr', () => {
    let wrap = render(<Demo />);
    let arrVal = wrap.getByRole('arrVal');
    let pushArr = wrap.getByRole('pushArr');
    let subArr = wrap.getByRole('subArr');

    act(() => {
      fireEvent.click(pushArr);
    });
    expect(JSON.parse(arrVal.textContent).length).toBe(1);
    act(() => {
      fireEvent.click(pushArr);
    });
    expect(JSON.parse(arrVal.textContent).length).toBe(2);
    act(() => {
      fireEvent.click(subArr);
    });
    expect(JSON.parse(arrVal.textContent).length).toBe(1);
  });

  it('test str', () => {
    let wrap = render(<Demo />);
    let strVal = wrap.getByRole('strVal');
    let changeVal = wrap.getByRole('changeVal');

    act(() => {
      fireEvent.change(changeVal, { target: { value: 'a' } });
    });
    expect(strVal.textContent).toBe('a');
  });
});
