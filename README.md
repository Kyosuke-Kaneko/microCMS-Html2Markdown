# microCMS-Html2Markdown

## Usage
Prepare your APIKey and Domain of microCMS
```
const { createClient } = microcms;
const client = createClient({
  serviceDomain: "yourDomain",
  apiKey: "your X-API-KEY"
  });
```
you have to contain each endpoints in'endpointArray' and select which category's contents.
```const endpointArray = ['category1','category2','category3','category4','category5'];
const category = endpointArray[0];
```

Only you open browser, you can get a markdown file which makeup each category's contents from your microCMS.

## Reference
https://microcms.io/

https://github.com/mixmark-io/turndown

https://github.com/mixmark-io/turndown-plugin-gfm
