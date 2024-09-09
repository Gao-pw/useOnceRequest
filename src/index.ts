import { useRef } from 'react';

type Request = (...args: any[]) => any;

function useRaceRequest<T extends Request>(request: T): T {
  const umiCancel = useRef<AbortController | null>(null);

  const newRequest = (...args: Parameters<T>) => {
    if (umiCancel.current) {
      umiCancel.current.abort();
    }
    const controller = new AbortController();
    umiCancel.current = controller;
    let options = { signal: controller.signal };

    if (request.length === 1) {
      //* 说明该方法只有 options 参数
      return request({ ...args[0], signal: controller.signal });
    }

    if (args.length === request.length - 1) {
      //* 说明用户没传 options
      return request(...args, options);
    } else {
      //* 说明有 options
      //* 判断 options 是一个对象，获取 options 参数并进行拼接
      options = args[args.length - 1];
      options = { ...options, signal: controller.signal };
      return request(...args.slice(0, args.length - 1), options);
    }
  };

  return newRequest as T;
}

export default useRaceRequest;

function useRaceRequests<T extends Request[]>(requests: T): T {
  const umiCancels = useRef<Record<string, AbortController>>({});

  const newRequests = requests.map((request) => {
    return (...args: Parameters<T[number]>) => {
      if (umiCancels.current && umiCancels.current[request.name]) {
        umiCancels.current[request.name].abort();
      }
      const controller = new AbortController();
      umiCancels.current = {
        ...umiCancels.current,
        [request.name]: controller,
      };
      let options = { signal: controller.signal };
      if (request.length === 1) {
        //* 说明该方法只有 options 参数
        return request({ ...args[0], signal: controller.signal });
      }

      if (args.length === request.length - 1) {
        //* 说明用户没传 options
        return request(...args, options);
      } else {
        //* 说明有 options
        //* 判断 options 是一个对象，获取 options 参数并进行拼接
        options = args[args.length - 1];
        options = { ...options, signal: controller.signal };
        return request(...args.slice(0, args.length - 1), options);
      }
    };
  });

  return newRequests as T;
}

export { useRaceRequests };
