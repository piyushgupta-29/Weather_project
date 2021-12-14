const fs=require('fs');
const http=require('http');
const url=require('url');
const EventEmitter=require('events');
const event=new EventEmitter();

const t=fs.readFileSync(`${__dirname}/api.json`,'utf-8');
const api_data=JSON.parse(t);
const html_data=fs.readFileSync('index.html','utf-8');

const replaceVal=()=>{
    let temp=html_data.replace('{%temp%}',api_data.main.temp);
    temp=temp.replace('{%mintemp%}',api_data.main.temp_min);
    temp=temp.replace('{%maxtemp%}',api_data.main.temp_max);
    temp=temp.replace('{%city%}',api_data.name);
    temp=temp.replace('{%country%}',api_data.sys.country);
    temp=temp.replace('{%tempstatus%}',api_data.weather[0].main);
    return temp;
}
const server=http.createServer((req,res)=>{
    if(req.url=='/')
    {
        let ans=replaceVal();
        res.writeHead(200,{'Content-type': 'text/html'});
        res.write(ans);
        res.end();
    }
    else 
        res.end('error');
});
server.listen(3000,(err)=>{
    if(err)
        console.log('There is an error');
    else
        console.log('listning..');
})
