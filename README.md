# useOnceRequest

## 适配 umijs + openapi-plugin 的请求竞态 hook

### 【前置条件】

1. [umimax](https://umijs.org/docs/max/introduce)
2. [plugin-openapi](https://www.npmjs.com/package/@umijs/plugin-openapi)

### 使用方法

1. **生成的请求方法举例**

   ```ts
   export async function createDept(body: API.DeptCreateReqVO, options?: { [key: string]: any }) {
     return request<API.CommonResultLong>('/api/v1/system/demo/create', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       data: body,
       ...(options || {}),
     });
   }
   ```
2. 使用

   ```
   import useRaceRequest, {useRaceRequests} from "@siroi/use-once-request"

   const currentRequest = useRaceRequest(createDept);

   //or
   const [currentRequest] = useRaceRequesrs([createDept]);
   ```
