import throttle from 'lodash/throttle';
import { Dispatch } from 'umi';

export class Mutual {
  public static topScollerValue = 0;

  public static affixScrollerValue = 80;

  public static ptchMenuScroller = (dispatch: Dispatch): any => {
    return throttle(() => {
      let scrollTop =
        window.pageYOffset ||
        window.document.documentElement?.scrollTop ||
        window.document.body?.scrollTop ||
        0;

      if (Mutual.topScollerValue <= scrollTop) {
        dispatch({
          type: 'global/getScroller',
          payload: {
            scroller: true,
          },
        });
      } else {
        dispatch({
          type: 'global/getScroller',
          payload: {
            scroller: false,
          },
        });
      }

      setTimeout(() => {
        Mutual.topScollerValue = scrollTop;
      });
    }, 100);
  };

  public static affixMenuScroller = (dispatch: Dispatch): any => {
    return throttle(() => {
      let scrollTop =
        window.pageYOffset ||
        window.document.documentElement?.scrollTop ||
        window.document.body?.scrollTop ||
        0;

      if (scrollTop > Mutual.affixScrollerValue) {
        dispatch({
          type: 'global/getScroller',
          payload: {
            scroller: true,
          },
        });
      } else {
        dispatch({
          type: 'global/getScroller',
          payload: {
            scroller: false,
          },
        });
      }
    }, 100);
  };
}
