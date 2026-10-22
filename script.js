const welcome=document.getElementById('welcome');const main=document.getElementById('main');const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;document.getElementById('open').addEventListener('click',()=>{welcome.classList.add('is-open');welcome.setAttribute('aria-hidden','true');document.body.classList.remove('locked');main.focus({preventScroll:true});if(!reduced)scatter(28)});if('IntersectionObserver'in window){const ob=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');ob.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>ob.observe(el))}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));function scatter(count){const parent=document.getElementById('petals');for(let i=0;i<count;i++){const e=document.createElement('span');e.className='petal';e.style.left=Math.random()*100+'vw';e.style.setProperty('--drift',(Math.random()*240-120)+'px');e.style.animationDuration=(5+Math.random()*7)+'s';e.style.animationDelay=(Math.random()*2)+'s';parent.appendChild(e);e.addEventListener('animationend',()=>e.remove(),{once:true})}}const date=new Date('2026-11-19T19:00:00+05:00').getTime();function tick(){const rest=Math.max(0,date-Date.now());const values={days:Math.floor(rest/86400000),hours:Math.floor(rest/3600000)%24,minutes:Math.floor(rest/60000)%60,seconds:Math.floor(rest/1000)%60};for(const [id,n]of Object.entries(values))document.getElementById(id).textContent=String(n).padStart(2,'0');if(!rest)document.getElementById('countdownMessage').textContent='Thank you for celebrating with us!'}tick();setInterval(tick,1000);document.getElementById('calendar').addEventListener('click',()=>{const content=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Wedding Invitation//EN','BEGIN:VEVENT','UID:arslan-tasawar-20261121@invite','DTSTAMP:20261013T000000Z','DTSTART:20261121T140000Z','DTEND:20261121T170000Z','SUMMARY:Wedding Celebration - M. Arslan Tasawar','DESCRIPTION:Reception and Barat at 7:00 PM (Pakistan Time). Mehndi 19 November at Dera Malik Phool Ahmad Awan and Barat 20 November at Hafizabad Gymkhana.','LOCATION:Hafizabad Gymkhana\\, Opposite District Complex\\, Hafizabad\\, Pakistan','END:VEVENT','END:VCALENDAR'].join('\r\n');const url=URL.createObjectURL(new Blob([content],{type:'text/calendar;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='arslan-tasawar-wedding.ics';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)});
/* Spotify's official embed API. Starting position is requested at 21 seconds.
   Browsers and Spotify account policies may block automatic playback. */
const SPOTIFY_TRACK='spotify:track:0e1w3jIoTW7flmZdT2eaXD';
let spotifyController=null;
let spotifyStartRequested=false;
const spotifyButton=document.getElementById('musicToggle');
const spotifyPanel=document.getElementById('spotifyPanel');
const spotifyPlay=document.getElementById('spotifyPlay');
const spotifyStatus=document.getElementById('spotifyStatus');
function showSpotify(){spotifyPanel.hidden=false;spotifyButton.setAttribute('aria-expanded','true');spotifyButton.textContent='✕ Close Player'}
function playSpotifyAt21(){
 showSpotify();
 spotifyStartRequested=true;
 if(!spotifyController){spotifyStatus.textContent='Loading Spotify player. Press Play from 0:21 when ready.';return}
 try{spotifyController.loadUri(SPOTIFY_TRACK,false,21);spotifyController.play();spotifyStatus.textContent='Requested playback from 0:21. If sound is blocked, press Play in the Spotify player.'}
 catch(e){spotifyStatus.textContent='Please press Play directly in the Spotify player or open Spotify.'}
}
window.onSpotifyIframeApiReady=(IFrameAPI)=>{
 IFrameAPI.createController(document.getElementById('spotifyEmbed'),{uri:SPOTIFY_TRACK,width:'100%',height:152},controller=>{
 spotifyController=controller;
 spotifyStatus.textContent='Ready. Press Play from 0:21.';
 controller.addListener('ready',()=>{try{controller.loadUri(SPOTIFY_TRACK,false,21)}catch(e){}});
 });
};
spotifyButton?.addEventListener('click',()=>{if(spotifyPanel.hidden)showSpotify();else{spotifyPanel.hidden=true;spotifyButton.setAttribute('aria-expanded','false');spotifyButton.textContent='♫ Names of Allah'}});
spotifyPlay?.addEventListener('click',playSpotifyAt21);
document.getElementById('open')?.addEventListener('click',()=>{showSpotify();playSpotifyAt21()});
