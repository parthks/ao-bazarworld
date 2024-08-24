// open dumdum_assets.json
let assets = require("fs").readFileSync("data/dumdumz_assets.json", "utf8");
let dumdum_assets: string[] = JSON.parse(assets)["Assets"];

let traits = require("fs").readFileSync("data/dumdumz_traits.json", "utf8");
let dumdumData = JSON.parse(traits) as {
  id?: string;
  name: string;
  edition: number;
  description: string;
  date: string;
  attributes: { trait_type: string; value: string }[];
}[];

try {
  let fullData = require("fs").readFileSync("data/dumdum_full_data.json", "utf8");
  dumdumData = JSON.parse(fullData);
} catch (e) {
  console.log("No full data file found");
}

async function getAssetsData(ids: string[]) {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("accept-language", "en-US,en;q=0.9");
  myHeaders.append("content-type", "application/json");
  myHeaders.append("priority", "u=1, i");
  myHeaders.append("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36");

  const graphql = JSON.stringify({
    query: `query { 
                transactions(
                ids: [${ids.map((d) => `"${d}"`).join(",")}],
                tags: null,
                first: 100
                owners: null,
                block: null,
                after: null,
                ){               
                pageInfo {
                    hasNextPage
                    
                }
                edges {
                        cursor
                        node {
                            id
                            tags {
                                name 
                                value 
                            }
                            data { size type } owner { address } block { height timestamp }
                        }
                    }
		        } 
            }`,
    variables: {},
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  } as any;

  return fetch("https://arweave.net/graphql", requestOptions)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

async function run() {
  console.log("total dumdum assets", dumdum_assets.length);

  // remove assets that already have id
  for (let i = 0; i < dumdum_assets.length; i++) {
    const assetId = dumdum_assets[i];
    const dumdumIndex = dumdumData.findIndex((d) => d.id === assetId);
    if (dumdumIndex !== -1) {
      dumdum_assets.splice(i, 1);
      i--;
    }
  }

  console.log("dumdum_assets to parse", dumdum_assets.length);

  // iterate over 100 assets at a time
  for (let i = 0; i < dumdum_assets.length; i += 100) {
    const ids = dumdum_assets.slice(i, i + 100);
    console.log(ids);
    console.log("fetching", i, "to", i + 100);
    const graphqlData = (await getAssetsData(ids)) as any;
    const data = graphqlData.data.transactions.edges.map((d: any) => d.node) as any;
    for (let i = 0; i < data.length; i++) {
      const tags = data[i].tags;
      // find tag where name=Title
      const id = data[i].id;
      const dumdumName = tags.find((d: any) => d.name === "Title").value;
      // add id to dumdumData object where name = edition key in each object
      const dumdumIndex = dumdumData.findIndex((d) => d.edition === parseInt(dumdumName));
      dumdumData[dumdumIndex].id = id;
    }
    require("fs").writeFileSync("data/dumdum_full_data.json", JSON.stringify(dumdumData, null, 2), "utf8");
  }
}
run();

// EPs2CmcRZAIkPm29PWT2lTe6lzvuvvEoQtJFI_zTOI0
// xB0797ffWRDy-yKgZpIEPAfG2tPcjMPTSBRs-uabpRg
// both are 1538
// 1536 is missing
