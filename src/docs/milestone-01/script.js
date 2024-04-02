const overview = document.getElementById('overview');
const application = document.getElementById('application-parts');
const data = document.getElementById('data-requirements');
const wireframes = document.getElementById('wire-frames');
const real = document.getElementById('real-world');
const IE = document.getElementById('IE');


function count(element){
    let inner = element.innerHTML;

    inner = inner.substring(inner.indexOf('<p>')+3, inner.indexOf('</p>'));
    const regex = /<[^>]*>/g;
    inner = inner.replace(regex, "");
    console.log(inner);
    inner = inner.split(' ');
    console.log(inner.length);
}

overview.addEventListener('mouseover',()=>{count(overview)});
application.addEventListener('mouseover',()=>{count(application)});
data.addEventListener('mouseover',()=>{count(data)});
wireframes.addEventListener('mouseover',()=>{count(wireframes)});
real.addEventListener('mouseover',()=>{count(real)});
IE.addEventListener('mouseover',()=>{count(IE)});