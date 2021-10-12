const { createClient } = microcms;
const gfm = turndownPluginGfm.gfm;
let turndownService = new TurndownService({ headingStyle: 'atx' , codeBlockStyle: 'fenced', preformattedCode: 'true'});
turndownService.use(gfm);
// headingStyle: 'atx'h2が##で表示される
const client = createClient({
  serviceDomain: env.Domain,
  apiKey: env.apiKey
  });
const endpointArray = ['category1','category2','category3','category4','category5'];

const getAllContents = async (limit=100, offset=0) => {
  const category = endpointArray[0];
  const data = await client.get({
    endpoint: category,
    queries: {
      offset,
      limit
    }
  })
  const materialContents = data.contents;
  const mainContent = document.getElementById("mainContent");
  materialContents.forEach(element => {
    const p = document.createElement("p");
    const div = document.createElement("div");
    let title = `# ${element.title}`;
    let chapterContets = "";
    for (let i = 0; i < element.content.length ; i++) {
      if(element.content[i]) {
        let codeBlock = (element.content[i].richEditor) ? element.content[i].richEditor : element.content[i].html;
        chapterContets += codeBlock; 
      }
      div.innerHTML = chapterContets;
    }
    p.innerHTML = title;
    p.appendChild(div);
    mainContent.appendChild(p);
    //mainContentに取得したデータが全て格納されている。
  });

  let mainMd = turndownService.turndown(mainContent);
  const blob = new Blob([mainMd],{type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${category}.txt`;
  link.click();

  if (data.offset + data.limit < data.totalCount) {
    const contents = await getAllContents(data.limit, data.offset + data.limit)
    return [ ...data.contents, ...contents ]
  }
  return data.contents
}
getAllContents();
