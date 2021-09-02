const myForm = document.getElementById('myForm');
const ipt = document.getElementById('ipt');
const myDiv = document.getElementById('myDiv');

let youtube = {
    "id" : null,
    "vid_url" : null,
    "author" : null,
    "thumb" : null,
    "vid_title" : null,
};

const noEmbed = 'https://noembed.com/embed?url=';
const urlForm = "https://www.youtube.com/watch?v=";

function on_submit(e){
    e = e || window.event;
    e.preventDefault();
    youtube.id = ipt.value;
    get_info(youtube.id);
}//on_submit

function get_info(id){
    const full_url = noEmbed + urlForm + id;
    fetch(full_url)
    .then(res => res.json())
    .then(data=>{
        // console.log(data);
        set_info(data);
        display_info();
    });
}//get_info

function set_info(data){
    const {url, author_name, thumbnail_url, title} = data;
    youtube.vid_url = url;
    youtube.author = author_name;
    youtube.thumb = thumbnail_url;
    youtube.vid_title = title;
}//set_info

function display_info(){
    const {vid_url,author,thumb,vid_title} = youtube;

    myDiv.innerHTML = "";

    const link = document.createElement('A');
    link.href = vid_url;
    link.target = "_blank";

    const img = new Image;
    img.src = thumb;

    const title = document.createElement('DIV');
    title.innerText = vid_title;

    const vid_author = document.createElement('SPAN');
    vid_author.innerText = `by ${author}`;

    link.appendChild(img);
    link.appendChild(title);
    link.appendChild(vid_author);
    myDiv.appendChild(link);

}//display_info

/* ✨ 실행 */
myForm.addEventListener('submit',on_submit);