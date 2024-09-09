type Request = (...args: any[]) => any;
declare function useRaceRequest<T extends Request>(request: T): T;
export default useRaceRequest;
declare function useRaceRequests<T extends Request[]>(requests: T): T;
export { useRaceRequests };
