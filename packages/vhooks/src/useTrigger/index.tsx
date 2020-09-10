import React, {
  useRef,
  CSSProperties,
  useCallback,
  createContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { contains, addEventListener, portal } from '../utils/helper';
import Popup from './Popup';

type Placement =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft';

type Action = 'click' | 'hover';

export interface TriggerProps {
  triggerRef?: ReturnType<typeof useRef>;
  action: Action | Array<Action>;
  popupMotion?: string;
  popup?: React.ReactElement;
  placement?: Placement;
  popupStyle?: CSSProperties;
  closeCb?: () => void;
}

const TriggerContext = React.createContext<{}>(null);

export function useTrigger(props: TriggerProps): React.FC {
  const {
    triggerRef,
    popupMotion,
    popup,
    placement,
    popupStyle,
    action,
  } = props;

  // popupVisible
  // wrapper 包裹着
  const TriggerWrapper = useCallback((props) => {
    const [popupVisible, setVisible] = useState(false);

    // 创建event数组
    let events: Array<Action> = useMemo(() => {
      let events = [];
      if (typeof action === 'string') {
        events = [action];
      } else if (Array.isArray(action)) {
        events = action;
      } else {
        console.error('action must be a array or string');
        return [];
      }
      return events;
    }, []);

    // 对应的dom绑定事件处理函数
    let triggerBindEvents = useMemo(() => {
      return events.reduce((preObj, event: Action) => {
        if (event === 'click') {
          preObj.onMouseDown = (e: MouseEvent) => {
            console.log('onMouseDown');
          };
          preObj.onTouchStart = (e: TouchEvent) => {
            console.log('onTouchStart');
          };
          preObj.onClick = (e: MouseEvent) => {
            console.log('onClick');
          };
        } else if (event === 'hover') {
          preObj.onMouseEnter = (e: MouseEvent) => {
            console.log('onMouseEnter');
          };
          preObj.onMouseMove = (e: MouseEvent) => {
            console.log('onMouseMove');
          };
          preObj.onMouseLeave = (e: MouseEvent) => {
            console.log('onMouseLeave');
          };
        }
        return preObj;
      }, {} as any);
    }, []);

    // 使用一个新的React节点来代理
    let Trigger = React.cloneElement(props.children, {
      ...triggerBindEvents,
    });

    let popupContent = useMemo(() => {
      return <Popup>{popup}</Popup>;
    }, []);

    const popupObj = useMemo(() => {
      let popupContainer = document.createElement('div');
      popupContainer.style.position = 'absolute';
      popupContainer.style.top = '0';
      popupContainer.style.left = '0';
      popupContainer.style.width = '100%';
      document.body.appendChild(popupContainer);
      return portal(popupContainer, popupContent);
    }, []);

    const setPopupVisible = useCallback(() => {}, []);

    const delaySetPopupVisible = useCallback(() => {}, []);

    useEffect(() => {
      let onDocumentClick = (e) => {
        setVisible(false);
        if (!contains(window.document, e.target)) {
        }
      };
      let clickRef = [];
      events.forEach((event) => {
        if (event === 'click') {
          clickRef.push(
            addEventListener(window.document, 'click', onDocumentClick),
          );
        }
      });

      // ---------------------------------------------------------------------------------------------------------------------------------

      return () => {
        clickRef.forEach((fn) => fn.remove());
        popupObj.remove();
      };
    }, []);

    return (
      <TriggerContext.Provider value={{}}>
        {Trigger}
        {popupObj.add()}
      </TriggerContext.Provider>
    );
  }, []);

  return TriggerWrapper;
}
