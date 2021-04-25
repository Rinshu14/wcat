let fs= require("fs");
let input=process.argv.slice(2);
let options=[];
let filePaths=[];
for(let i=0;i<input.length;i++)
{
    if(input[i]=="-s"|| input[i]=="-b"||input[i]=="-n")
    {
        options.push(input[i]);
    }
    else 
    {
        filePaths.push(input[i]);
    }
}
//console.log("options",options);
//console.log("filePaths",filePaths);
for(let i=0;i<filePaths.length;i++)
{
    let isFilePresent=fs.existsSync(filePaths[i]);
    if(isFilePresent==false)
    {
        console.log("filepath",filePaths[i],"file not exits");
        return;
    }
}  
let totalContent="";
    for(let i=0;i<filePaths.length;i++)
    {
        let contentOfCurrent=fs.readFileSync(filePaths[i],"utf-8");
        totalContent+=contentOfCurrent+"\r\n";

    }
    let isoption=options.includes("-s");
    if(isoption==true)
   {
       let contentArr=totalContent.split("\r\n");
       let tempArr=[];
       for(let i=0;i<contentArr.length;i++)
       {
          if(contentArr[i]!=="")
          {
              tempArr.push(contentArr[i]);
          }
       }
       totalContent=tempArr.join("\r\n");
   }
   let isN=options.includes("-n");
   let isb=options.includes("-b");
   let finaloption;
   if(isN==true)
   {
       if(isb==true)
       {
           let indn=options.indexOf("-n");
           let indb=options.indexOf("-b");
           finaloption=(indb>indn)?"n":"b";
       }
       else{
           finaloption="n"
       }
   }
   else if(isb==true)
   {
       finaloption="b"
   }
  
   if(finaloption=="n")
   {
       let c=1;
       let contentArr=totalContent.split("\r\n");
       for(let i=0;i<contentArr.length;i++)
       {
           contentArr[i]=c+" "+contentArr[i];
           c++;
       }
       totalContent=contentArr.join("\r\n");
   }


if(finaloption=="b")
{
    let c=1;
    let contentArr=totalContent.split("\r\n");
    for(let i=0;i<contentArr.length;i++)
    {
        if(contentArr[i]!="")
        {
            contentArr[i]=c+" "+contentArr[i];
            c++;
        }
    }
    totalContent=contentArr.join("\r\n");
}
console.log(totalContent);



    