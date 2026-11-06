(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const pad=n=>String(n).padStart(2,'0');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const hex=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const mix=(a,b,t)=>{const A=hex(a),B=hex(b);t=clamp(t,0,1);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')};
const fmtDate=()=>new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'});

/* ---------- icons ---------- */
const ICON={
home:'<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
scan:'<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><circle cx="12" cy="11" r="3"/><path d="M7 17c1-2.5 3-3 5-3s4 .5 5 3"/>',
track:'<path d="M5 20v-8M12 20V5M19 20v-9"/>',
hub:'<path d="M5 19C5 10 10 5 20 4c0 10-4 15-13 15z"/><path d="M5 19c3-5 6-8 10-10"/>',
people:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17.5" cy="9" r="2.5"/><path d="M17 14c2.5 0 4.5 2 4.5 5"/>',
bell:'<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 21h4"/>',
flame:'<path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 .2 1.5 1 2 2 2 0-3-1-5 1-8z"/>',
back:'<path d="M15 5l-7 7 7 7"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',close:'<path d="M6 6l12 12M18 6L6 18"/>',
camera:'<path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.5"/>',
upload:'<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2.2 2.2L15.5 10"/>',
lock:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
wind:'<path d="M3 9h11a3 3 0 1 0-3-3M3 15h15a3 3 0 1 1-3 3M3 12h7"/>',
target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
heart:'<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>',
bolt:'<path d="M13 3L5 14h6l-1 7 8-11h-6z"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',
settings:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
moon:'<path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10z"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
run:'<circle cx="14" cy="5" r="2"/><path d="M5 21l3.5-6 3 2 2-5-3-2-2.5 3M13.5 10l3 2 3-1"/>',
send:'<path d="M21 3L3 11l7 2.5L12.5 21z"/><path d="M10 13.5L21 3"/>',
phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.5 3.5-7 8-7s8 2.5 8 7"/>',
chat:'<path d="M4 5h16v11H9l-5 4z"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
share:'<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/>',
star:'<path d="M12 3l2.7 5.8 6.3.8-4.6 4.3 1.2 6.3L12 17l-5.6 3.2 1.2-6.3L3 9.6l6.3-.8z"/>',
calendar:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
file:'<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/>',trash:'<path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13"/>',
download:'<path d="M12 4v12M7 11l5 5 5-5M4 20h16"/>',chevron:'<path d="M9 5l7 7-7 7"/>',
sparkle:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
speaker:'<path d="M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',
copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
apple:'<path fill="currentColor" stroke="none" d="M16.5 12.5c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7s-1.600-.7-2.600-.7C8 7.800 6.500 8.900 5.800 10.400c-1.500 2.600-.4 6.500 1.100 8.600.7 1 1.500 2.200 2.600 2.100 1 0 1.400-.7 2.700-.7s1.600.7 2.700.7c1.100 0 1.800-1 2.500-2 .8-1.100 1.100-2.200 1.100-2.300-.1 0-2.200-.8-2.200-3.300zM14.600 6.200c.6-.7 1-1.700.9-2.700-.9 0-1.900.6-2.500 1.300-.5.600-1 1.600-.9 2.600 1 .1 1.900-.5 2.500-1.200z"/>'
};
const ic=(n,s=22)=>`<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n]||''}</svg>`;
const logo=(s=64,anim=false)=>`<svg class="logo ${anim?'anim':''}" width="${s}" height="${s}" viewBox="0 0 120 120" fill="none" aria-hidden="true"><g class="brk" stroke="var(--lumen)" stroke-width="3" stroke-linecap="round"><path d="M12 32V16a4 4 0 0 1 4-4h16"/><path d="M88 12h16a4 4 0 0 1 4 4v16"/><path d="M108 88v16a4 4 0 0 1-4 4H88"/><path d="M32 108H16a4 4 0 0 1-4-4V88"/></g><path class="leaf" d="M60 20C86 30 94 62 60 104C26 62 34 30 60 20Z" fill="var(--leaf)" fill-opacity=".16" stroke="var(--leaf)" stroke-width="3.5" stroke-linejoin="round"/><g class="mesh" stroke="var(--lumen)" stroke-width="1.2" opacity=".8"><path d="M60 24V100M46 44H74M42 62H78M48 80H72M46 44L60 62L74 44M42 62L60 80L78 62"/></g><g class="dots" fill="var(--lumen)" opacity=".85"><circle cx="60" cy="44" r="2.2"/><circle cx="46" cy="44" r="2"/><circle cx="74" cy="44" r="2"/><circle cx="42" cy="62" r="2"/><circle cx="78" cy="62" r="2"/><circle cx="60" cy="62" r="2.2"/><circle cx="60" cy="80" r="2.2"/><circle cx="48" cy="80" r="2"/><circle cx="72" cy="80" r="2"/></g><rect class="scanline" x="30" y="22" width="60" height="2" rx="1" fill="var(--lumen)"/></svg>`;

/* ---------- data ---------- */
const QUOTES=['Today is a vote for the person you are becoming.','You don’t have to feel strong. You only have to stay.','A craving is a wave. It rises, it peaks, it passes.','Progress is rarely a straight line. Keep walking.','Small mornings, repeated, become a new life.','Asking for help is a skill, and you are practising it.','Rest is part of recovery, not a pause from it.','You are more than the hardest chapter.','One honest check-in beats a perfect streak.','Your future face is still being drawn.','Every clean day is evidence that you can.','Be as patient with yourself as you would be with a friend.'];
const SUBS=['Alcohol','Opioids','Cannabis','Stimulants','Sedatives','Others'];
const ARSUBS=['Alcohol','Opioids','Meth','Cocaine','Cannabis','Sedatives'];
const subKey=s=>({Stimulants:'Meth',Others:'Alcohol'}[s]||s);
const PROF={
 Alcohol:{tint:'#D9877A',ta:.5,red:.9,bloat:.8,wrinkle:.6,bags:.4,hollow:.05,sores:0,thin:.1,droop:.25,redEye:.5,jaund:.5,labels:['Facial redness','Broken capillaries','Bloating','Jaundice','Premature aging']},
 Opioids:{tint:'#C8B070',ta:.7,red:0,bloat:0,wrinkle:.45,bags:.85,hollow:1,sores:.1,thin:.25,droop:.6,redEye:.2,jaund:.6,labels:['Extreme weight loss','Sallow skin','Sunken eyes','Muscle atrophy']},
 Meth:{tint:'#B7A38E',ta:.5,red:.2,bloat:0,wrinkle:.65,bags:.55,hollow:.85,sores:1,thin:.65,droop:.2,redEye:.3,jaund:0,dental:1,labels:['Skin sores','Severe dental decay','Hollow cheeks','Hair thinning']},
 Cocaine:{tint:'#CDB9AA',ta:.4,red:.3,bloat:0,wrinkle:.6,bags:.5,hollow:.65,sores:.15,thin:.2,droop:.1,redEye:.85,jaund:0,nose:1,labels:['Nasal damage','Weight loss','Bloodshot eyes','Aged skin']},
 Cannabis:{tint:'#D2A590',ta:.2,red:.1,bloat:.35,wrinkle:.15,bags:.25,hollow:0,sores:0,thin:0,droop:.4,redEye:.6,jaund:0,labels:['Bloodshot eyes','Mild puffiness','Lethargic look']},
 Sedatives:{tint:'#D9D2CF',ta:.65,red:0,bloat:.15,wrinkle:.3,bags:.45,hollow:.2,sores:0,thin:.05,droop:1,redEye:.15,jaund:0,labels:['Drooping facial muscles','Pale skin','Slowed expression']}
};
const POSL=['Clearer skin','Brighter eyes','Healthier weight','More energy','Steadier sleep'];
const MOODS=[['happy','Happy',5],['neutral','Neutral',3],['anxious','Anxious',2],['craving','Craving',2],['struggling','Struggling',1]];
const MS=[7,30,60,90,180,365];
const BADGES=[['first','First Step','Completed a scan','scan'],['seven','7-Day Warrior','7 check-ins in a row','flame'],['thirty','30-Day Milestone','One month clean','calendar'],['face','Face the Future','Viewed an AR projection','eye'],['acct','Accountability Hero','Added an emergency contact','shield'],['comm','Community Pillar','5 supportive messages','people'],['ninety','90 Days Strong','Three months tracked','star']];
const HELP=[['India','Tele-MANAS','14416'],['United States','SAMHSA National Helpline','1-800-662-4357'],['United Kingdom','FRANK drugs advice','0300 123 6600']];
const NAMES=['RecoveryRobin','QuietHarbor','SteadyOak','BrightFox','CalmRiver','KindHeron'];
const anon=()=>NAMES[Math.floor(Math.random()*NAMES.length)]+'_'+(1000+Math.floor(Math.random()*9000));
const todayIdx=Math.floor(Date.now()/864e5);function init(){return{
 route:'splash',tab:'home',auth:{mode:'login',email:'alex.k@example.com',pw:'recovery123'},loggedOnce:false,setup:{step:0},
 user:{name:'Alex',age:'27',gender:'Male',subs:['Alcohol'],dur:'2–5 years',goal:'Full abstinence',ecName:'Maya',ecNum:'+91 98765 43210',counselor:false},
 days:34,streak:6,checkedToday:false,mood:null,craving:3,used:null,sleep:7,water:5,exercise:false,note:'',moodWeek:[4,3,4,3,2,3],
 habits:[{n:'Drink 8 glasses of water',d:true,s:9},{n:'15-minute walk',d:true,s:5},{n:'Call a friend',d:false,s:3},{n:'Evening journal',d:true,s:12},{n:'Lights out by 11 pm',d:false,s:2}],
 goals:[{t:'1 week',n:'Stay clean this week',p:6,m:7},{t:'1 week',n:'Attend one support meeting',p:0,m:1},{t:'1 month',n:'Complete a 60-day streak',p:34,m:60},{t:'1 month',n:'See a counselor twice',p:1,m:2},{t:'6 months +',n:'Be drug-free for 6 months',p:34,m:180},{t:'6 months +',n:'Rebuild family relationship',p:2,m:10}],
 favs:[],qi:todayIdx%QUOTES.length,
 badges:{first:false,seven:false,thirty:true,face:false,acct:true,comm:false,ninety:false},posts:3,
 scan:{photo:null,sev:58,done:false},ar:{sub:'Alcohol',years:10,path:'use',split:true,pos:50},
 /* Feature 1 screening state */
 screening:{concernSubs:[],answers:{},assistMulti:[],result:null,region:'India',done:false},
 /* Feature 2 AR educational state */
 arEdu:{sub:'Alcohol',milestone:'Today',path:'use',region:null,viewMode:'avatar',cameraOn:false,features:{eyes:true,nose:true,mouth:true,skin:true,jaw:true},focusedFeature:'eyes'},
 sub:{track:'checkin',hub:'today',comm:'forum'},gUnlocked:false,
 triggers:[['Place','Friday nights downtown',7],['Emotion','Work stress',6],['Person','Old drinking crowd',4],['Time','Payday weekends',3]],
 sf:'All',react:{},
 feed:[{id:1,u:'QuietHarbor_3318',tag:'milestone',t:'2h',txt:'90 days today. I almost skipped the check-in because I felt fine. Logged it anyway.',sup:41,rep:9},{id:2,u:'RecoveryRobin_2947',tag:'craving',t:'5h',txt:'Strong craving after work. Did the 4-7-8 breathing twice and walked around the block. It passed in about 20 minutes.',sup:27,rep:6},{id:3,u:'SteadyOak_1180',tag:'advice',t:'1d',txt:'What helped you tell family about a relapse? I am rehearsing the conversation.',sup:18,rep:14},{id:4,u:'BrightFox_0764',tag:'relapse',t:'2d',txt:'Slipped on Saturday. Telling you all because hiding it made it heavier. Back to day 1, still here.',sup:63,rep:21}],
 postTag:'craving',anon:anon(),buddy:false,pairing:false,
 buddyMsgs:[{r:'b',t:'Hey, I\'m SteadyOak. Day 29 here. How was your week?'}],
 chat:[{r:'b',t:'Hi Alex, I\'m your recovery coach. Ask me about cravings, withdrawal, treatment options, or just talk.'}],
 share:{sob:true,chk:true,mil:true,sos:true,wk:false},guard:'guardian',
 clinMsgs:[{r:'c',t:'Hi Alex, I noticed Friday evenings are your hardest window. Want to plan this week together?'}],
 bio:true,remind:'20:00',notif:true,theme:'system',fam:false
};}
let S=init();

/* ---------- scoring ---------- */
function parts(){const done=S.habits.filter(h=>h.d).length;return{sob:Math.min(40,Math.round(S.days/60*40)),chk:Math.round(Math.min(S.streak,7)/7*20),hab:Math.round(done/Math.max(1,S.habits.length)*20),com:Math.round(Math.min(S.posts,5)/5*20)}}
const score=()=>{const p=parts();return p.sob+p.chk+p.hab+p.com};
const lvl=v=>v<40?{k:'LOW',c:'good',d:'Minimal visible physical impact detected. You may be in the early stages. Preventative guidance is recommended.'}:v<70?{k:'MEDIUM',c:'warn',d:'Moderate signs of physical deterioration observed. Intervention and a structured recovery plan are recommended.'}:{k:'HIGH',c:'bad',d:'Significant physical markers detected. Immediate professional support is strongly advised.'};

/* ---------- faces ---------- */
const Dof=(yr,path,sev)=>{const base=.12+.30*sev,mx=.55+.45*sev,f=yr/20;return path==='use'?base+(mx-base)*f:base*(1-.9*f)};
const HEAD='M60 124C58 62 182 62 180 124C182 192 150 230 120 230C90 230 58 192 60 124Z';
function faceSVG(o){
 const P=PROF[o.key]||PROF.Alcohol,D=o.D,u=o.uid,g=o.glow||0,gr=o.gray||0;
 const r=k=>clamp((P[k]||0)*D,0,1),Dm=clamp(D,0,1);
 let skin=mix('#D8A27C',P.tint,P.ta*Dm*1.1);skin=mix(skin,'#CDB55F',r('jaund')*.45);skin=mix(skin,'#F2C9A8',g*.5);
 const dark=mix(skin,'#3a1f18',.28),darker=mix(skin,'#2a130e',.45),hair=mix('#2B2320','#A8A8A8',gr*.7),thin=r('thin');
 const bl=r('bags'),hol=r('hollow'),dr=r('droop'),re=r('redEye'),rd=r('red'),wr=r('wrinkle'),so=r('sores'),bf=r('bloat');
 const lip=mix('#B5645A','#B9A8A2',P.ta*Dm*.8),sp=[[88,168],[150,176],[112,206],[140,150],[100,150],[160,162],[92,186],[128,214]];
 let sores='';for(let i=0;i<Math.round(so*8);i++){sores+=`<circle cx="${sp[i][0]}" cy="${sp[i][1]}" r="3" fill="#7A3A30" opacity=".85"/><circle cx="${sp[i][0]}" cy="${sp[i][1]}" r="5" fill="none" stroke="#C9564A" stroke-width="1" opacity=".5"/>`}
 const lc=(y)=>(197+2*Dm).toFixed(1);
 let mouth='';
 if(P.dental){mouth+=`<path d="M103 198Q120 214 137 198Q120 205 103 198Z" fill="#EFE6DA"/>`;[108,115,123,130].forEach(x=>{mouth+=`<rect x="${x}" y="203" width="5" height="5" rx="1" fill="#6F4F26" opacity="${(.9*Dm).toFixed(2)}"/>`})}
 mouth+=`<path d="M102 ${lc()}Q120 ${(206-11*Dm).toFixed(1)} 138 ${lc()}" stroke="${lip}" stroke-width="5.5" fill="none" stroke-linecap="round"/>`;
 const eye=(cx,n)=>`<ellipse cx="${cx}" cy="130" rx="13" ry="7.5" fill="#F2EEE9"/><g clip-path="url(#ce${n}${u})"><rect x="${cx-16}" y="120" width="32" height="20" fill="#E36B5F" opacity="${(re*.5).toFixed(2)}"/><circle cx="${cx}" cy="130" r="5.4" fill="#3A2A22"/><circle cx="${cx}" cy="130" r="2.5" fill="#0b0b0b"/><circle cx="${cx+2}" cy="128" r="1" fill="#fff" opacity=".8"/><path d="M${cx-12} 130l7-1M${cx+12} 131l-7-1M${cx-6} 124l3 4M${cx+6} 124l-3 4" stroke="#D2453D" stroke-width=".8" opacity="${re.toFixed(2)}"/><rect x="${cx-16}" y="120" width="32" height="${(2+dr*8).toFixed(1)}" fill="${dark}"/></g><path d="M${cx-14} 128Q${cx} 120 ${cx+14} 128" stroke="#2A1B16" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="${cx}" cy="141" rx="16" ry="6" fill="#4A2F45" opacity="${(bl*.5).toFixed(2)}" filter="url(#b3${u})"/>`;
 return `<svg viewBox="0 0 240 300" role="img" aria-label="Illustrated face" xmlns="http://www.w3.org/2000/svg"><defs><filter id="b6${u}" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="6"/></filter><filter id="b3${u}" x="-40%" y="-60%" width="180%" height="220%"><feGaussianBlur stdDeviation="3"/></filter><radialGradient id="gl${u}" cx="50%" cy="42%" r="55%"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><clipPath id="ce1${u}"><ellipse cx="96" cy="130" rx="13" ry="7.5"/></clipPath><clipPath id="ce2${u}"><ellipse cx="144" cy="130" rx="13" ry="7.5"/></clipPath><clipPath id="hd${u}"><path d="${HEAD}"/></clipPath></defs>
<path d="M16 300C20 252 66 238 98 232h44c32 6 78 20 82 68z" fill="#2E5E55"/><path d="M98 196v42c9 12 35 12 44 0v-42z" fill="${dark}"/>
<g transform="translate(120 150) scale(${(1+.07*bf).toFixed(3)}) translate(-120 -150)"><ellipse cx="58" cy="138" rx="7" ry="13" fill="${skin}"/><ellipse cx="182" cy="138" rx="7" ry="13" fill="${skin}"/><path d="${HEAD}" fill="${skin}"/>
<g clip-path="url(#hd${u})"><ellipse cx="82" cy="170" rx="14" ry="26" fill="#3A2218" opacity="${(hol*.3).toFixed(2)}" filter="url(#b6${u})"/><ellipse cx="158" cy="170" rx="14" ry="26" fill="#3A2218" opacity="${(hol*.3).toFixed(2)}" filter="url(#b6${u})"/>
<ellipse cx="86" cy="160" rx="20" ry="16" fill="#D2453D" opacity="${(rd*.38).toFixed(2)}" filter="url(#b6${u})"/><ellipse cx="154" cy="160" rx="20" ry="16" fill="#D2453D" opacity="${(rd*.38).toFixed(2)}" filter="url(#b6${u})"/><ellipse cx="120" cy="168" rx="12" ry="8" fill="#C0463E" opacity="${clamp(rd*.35+(P.nose||0)*D*.5,0,.8).toFixed(2)}" filter="url(#b3${u})"/>
<path d="M78 156q4 3 9 1M80 162q5-1 8 3M152 156q4-2 9 1M154 164q5 1 8-2" stroke="#C23B3B" stroke-width=".9" fill="none" opacity="${Math.min(1,rd*.8).toFixed(2)}"/>
<g stroke="${darker}" stroke-width="1.4" fill="none" stroke-linecap="round"><path d="M90 96Q120 92 150 96M92 103Q120 99 148 103" opacity="${(wr*.55).toFixed(2)}"/><path d="M100 170Q94 186 98 200M140 170Q146 186 142 200" opacity="${(wr*.7).toFixed(2)}"/><path d="M80 128l-9-3M80 132l-10 1M160 128l9-3M160 132l10 1" opacity="${(wr*.5).toFixed(2)}"/></g>${sores}
<ellipse cx="120" cy="140" rx="70" ry="92" fill="url(#gl${u})" opacity="${g.toFixed(2)}"/></g>
${eye(96,1)}${eye(144,2)}
<path d="M80 ${(114+dr*2.5).toFixed(1)}Q96 ${(108+dr*3).toFixed(1)} 111 ${(113+dr*2.5).toFixed(1)}M129 ${(113+dr*2.5).toFixed(1)}Q144 ${(108+dr*3).toFixed(1)} 160 ${(114+dr*2.5).toFixed(1)}" stroke="${hair}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
<path d="M120 136C118 152 111 162 111 168C117 175 130 175 129 168C127 162 122 152 120 136" stroke="${darker}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>${mouth}
<path d="M57 126C48 50 192 50 183 126C178 96 164 82 120 80C76 82 62 96 57 126Z" fill="${hair}" opacity="${(1-.5*thin).toFixed(2)}"/>
<path d="M62 112C72 92 92 84 104 88C94 96 82 106 74 126Z" fill="${skin}" opacity="${(thin*.9).toFixed(2)}"/><path d="M178 112C168 92 148 84 136 88C146 96 158 106 166 126Z" fill="${skin}" opacity="${(thin*.9).toFixed(2)}"/></g></svg>`;
}
function facePhoto(o){
 const P=PROF[o.key]||PROF.Alcohol,D=o.D,g=o.glow||0,r=k=>clamp((P[k]||0)*D,0,1);
 const f=`saturate(${clamp(1-.35*P.ta*D+.25*g,.3,1.3).toFixed(2)}) sepia(${clamp(P.ta*D*.5,0,.6).toFixed(2)}) contrast(${(1+.1*D).toFixed(2)}) brightness(${(1-.14*D+.1*g).toFixed(2)})`;
 const bg=(x,y,w,h,c,a)=>`radial-gradient(ellipse ${w}% ${h}% at ${x}% ${y}%,rgba(${c},${a.toFixed(2)}),transparent)`;
 const ov=[bg(36,45,22,7,'60,30,50',r('bags')*.55),bg(64,45,22,7,'60,30,50',r('bags')*.55),bg(27,64,14,22,'40,20,15',r('hollow')*.4),bg(73,64,14,22,'40,20,15',r('hollow')*.4),bg(30,58,20,14,'210,69,61',r('red')*.4),bg(70,58,20,14,'210,69,61',r('red')*.4)].join(',');
 const photoSrc=(o&&o.src)||(S.scan&&S.scan.photo)||window.SAMPLE_PORTRAIT||'';
 return `<div class="pface" style="filter:${f}"><img src="${photoSrc}" alt="Face photo"><i style="background:${ov}"></i><i class="vg" style="opacity:${(r('hollow')*.5).toFixed(2)}"></i><i style="background:radial-gradient(circle at 50% 40%,rgba(255,255,255,.5),transparent 60%);opacity:${(g*.5).toFixed(2)}"></i></div>`;
}
const face=o=>S.scan.photo?facePhoto(o):faceSVG(o);
const MESH=(()=>{let d='',c='';const ring=(cx,cy,rx,ry,n)=>{const a=[];for(let i=0;i<n;i++){const t=i/n*Math.PI*2;a.push([cx+rx*Math.cos(t),cy+ry*Math.sin(t)])}return a};
 const R=[ring(120,148,62,84,28),ring(120,148,42,58,28),ring(120,148,22,30,14),ring(96,130,14,7,8),ring(144,130,14,7,8),ring(120,200,18,7,10)];
 const L=(p,q)=>`M${p[0].toFixed(1)} ${p[1].toFixed(1)}L${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
 R.forEach(a=>a.forEach((p,i)=>{d+=L(p,a[(i+1)%a.length]);c+=`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="1.4"/>`}));
 for(let i=0;i<28;i++){d+=L(R[0][i],R[1][i]);if(i%2===0)d+=L(R[1][i],R[2][i/2])}
 return `<svg class="meshsvg" viewBox="0 0 240 300" aria-hidden="true"><path d="${d}" stroke="var(--lumen)" stroke-width=".6" fill="none"/><g fill="var(--lumen)">${c}</g></svg>`})();
const cmp=(L,R,lt,rt,store)=>`<div class="cmp" data-store="${store||''}" style="--pos:${S.ar.pos}%"><div class="ly">${R}</div><div class="ly top">${L}</div><span class="tg l">${lt}</span><span class="tg r">${rt}</span><div class="dv" style="left:var(--pos)"><b>${ic('chevron',18)}</b></div></div>`;

/* ---------- core ui ---------- */
const view=$('#view'),tabbar=$('#tabbar'),fab=$('#sosfab'),sheetEl=$('#sheet'),scrim=$('#scrim'),toastEl=$('#toast');
let timers=[],B=null,toastT=null;
const later=(fn,ms)=>{const t=setTimeout(fn,ms);timers.push(t);return t};
function stopBreath(){if(B){clearInterval(B);B=null}}
function clearTimers(){timers.forEach(clearTimeout);timers=[];stopBreath()}
function toast(m){toastEl.textContent=m;toastEl.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>{toastEl.hidden=true},2600)}
function openSheet(h){sheetEl.innerHTML='<div class="grab"></div>'+h;sheetEl.hidden=false;scrim.hidden=false;sheetEl.scrollTop=0}
function closeSheet(){sheetEl.hidden=true;scrim.hidden=true;stopBreath()}
const hdr=(t,s,o={})=>`<header class="hd">${o.back?`<button class="ibtn" data-a="nav" data-r="${o.back}" aria-label="Back">${ic('back')}</button>`:''}<div class="hdt"><h1>${t}</h1>${s?`<p>${s}</p>`:''}</div>${o.right||''}</header>`;
function award(id){if(S.badges[id])return;S.badges[id]=true;const b=BADGES.find(x=>x[0]===id);toast('Badge unlocked: '+b[1])}
const NOTAB=['splash','login','setup','analyzing','ar','arEnhanced','guardian','family','consent','subSelect','questionnaire','screenResult'],NOFAB=['splash','login','setup','analyzing','ar','arEnhanced','guardian','family','consent','subSelect','questionnaire','screenResult'];
const TABOF={home:'home',scanIntro:'scan',analyzing:'scan',result:'scan',ar:'scan',arEnhanced:'scan',consent:'scan',subSelect:'scan',questionnaire:'scan',screenResult:'scan',track:'track',hub:'hub',comm:'comm'};
function tabs(){return [['home','home','Home'],['scan','scan','Scan'],['track','track','Track'],['hub','hub','Hub'],['comm','people','Community']].map(([k,i,l])=>`<button class="tab ${k==='scan'?'mid':''} ${S.tab===k?'on':''}" data-a="tab" data-k="${k}" aria-label="${l}">${k==='scan'?`<span class="orb">${ic(i,26)}</span>`:ic(i,22)}<span>${l}</span></button>`).join('')}
function nav(r,o){clearTimers();S.chat=S.chat.filter(m=>!m.typing);S.route=r;if(o)Object.assign(S,o);if(TABOF[r])S.tab=TABOF[r];render(false)}
function render(keep){
 const top=view.scrollTop;view.innerHTML=SCREEN[S.route]();
 tabbar.hidden=NOTAB.includes(S.route);fab.hidden=NOFAB.includes(S.route);fab.classList.toggle('low',tabbar.hidden);tabbar.innerHTML=tabs();
 view.scrollTop=keep?top:0;if(AFTER[S.route])AFTER[S.route]()}

/* ---------- screens ---------- */
const SCREEN={},AFTER={},TRK={},HUB={},COM={};

SCREEN.splash=()=>`<div class="splash">${logo(140,true)}<h1 class="wm">Rehab Reality</h1><p class="tg">See Your Future. Choose It.</p></div>`;
AFTER.splash=()=>later(()=>nav('login'),2500);

SCREEN.login=()=>{const a=S.auth,su=a.mode==='up';return `<div class="pg auth nofab"><div class="brand">${logo(40)}<span>Rehab Reality</span></div>
<div><h1>${su?'Start your recovery journey':'Welcome back'}</h1><p class="sub" style="margin-top:6px">${su?'Create an account. It takes under a minute.':'Log in to pick up where you left off.'}</p></div>
<div class="seg"><button class="${su?'':'on'}" data-a="authMode" data-v="login">Log in</button><button class="${su?'on':''}" data-a="authMode" data-v="up">Sign up</button></div>
<form data-form="auth" novalidate style="display:flex;flex-direction:column;gap:14px">
<label class="fld"><span>Email</span><input class="in" id="email" type="email" autocomplete="email" data-bind="auth.email" value="${esc(a.email)}"><span class="err" id="e-email"></span></label>
<label class="fld"><span>Password</span><div class="row"><input class="in" id="pw" type="password" autocomplete="${su?'new-password':'current-password'}" data-bind="auth.pw" value="${esc(a.pw)}"><button type="button" class="ibtn" data-a="pwShow" aria-label="Show password">${ic('eye')}</button></div><span class="err" id="e-pw"></span></label>
<button class="btn block" type="submit">${su?'Create account':'Log in'}</button></form>
${su?'':`<button class="link" style="text-align:left" data-a="forgot">Forgot password?</button>`}
<div class="or">or continue with</div>
<div class="soc"><button class="btn ghost" data-a="social" data-v="Google"><b style="font:800 17px var(--f-display)">G</b> Google</button><button class="btn ghost" data-a="social" data-v="Apple">${ic('apple',20)} Apple</button></div>
${S.loggedOnce?`<button class="btn soft block" data-a="bio">${ic('scan')} Use Face ID or fingerprint</button>`:`<p class="muted ctr" style="font-size:12.5px">Face ID and fingerprint unlock appear after your first login.</p>`}
${su?'':`<p class="ctr">New user? <button class="link" data-a="authMode" data-v="up">Start your recovery journey</button></p>`}</div>`};

SCREEN.setup=()=>{const st=S.setup.step,u=S.user;let body='';
 if(st===0)body=`<div><h1>About you</h1><p class="sub" style="margin-top:6px">We use this to personalise your plan. You can change it later.</p></div>
<label class="fld"><span>Full name</span><input class="in" id="nm" data-bind="user.name" value="${esc(u.name)}" autocomplete="name"></label>
<label class="fld"><span>Age</span><input class="in" id="age" type="number" inputmode="numeric" min="10" max="99" data-bind="user.age" data-i="age" value="${esc(u.age)}"><span class="err" id="ageMsg"></span></label>
<div class="fld"><span>Gender</span><div class="chips">${['Female','Male','Non-binary','Prefer not to say'].map(g=>`<button class="chip ${u.gender===g?'on':''}" data-a="pick" data-k="gender" data-v="${g}">${g}</button>`).join('')}</div></div>`;
 else if(st===1)body=`<div><h1>Your story</h1><p class="sub" style="margin-top:6px">No judgement here. This helps tailor guidance.</p></div>
<div class="fld"><span>Substances used (choose all that apply)</span><div class="chips">${SUBS.map(s=>`<button class="chip ${u.subs.includes(s)?'on':''}" data-a="chip" data-v="${s}">${s}</button>`).join('')}</div></div>
<div class="fld"><span>How long?</span>${['< 6 months','6 months–2 years','2–5 years','5+ years'].map(d=>`<button class="opt ${u.dur===d?'on':''}" data-a="pick" data-k="dur" data-v="${d}"><i class="rd"></i>${d}</button>`).join('')}</div>
<div class="fld"><span>Recovery goal</span>${['Reduce use','Full abstinence','Maintenance','Not sure yet'].map(d=>`<button class="opt ${u.goal===d?'on':''}" data-a="pick" data-k="goal" data-v="${d}"><i class="rd"></i>${d}</button>`).join('')}</div>`;
 else body=`<div><h1>Your support</h1><p class="sub" style="margin-top:6px">Having someone to call makes hard moments easier.</p></div>
<label class="fld"><span>Emergency contact name (optional)</span><input class="in" id="ecn" data-bind="user.ecName" value="${esc(u.ecName)}"></label>
<label class="fld"><span>Emergency contact number</span><input class="in" id="ecp" type="tel" data-bind="user.ecNum" value="${esc(u.ecNum)}"></label>
<div class="fld"><span>Do you currently see a counselor or therapist?</span><div class="seg"><button class="${u.counselor?'on':''}" data-a="counsel" data-v="1">Yes</button><button class="${u.counselor?'':'on'}" data-a="counsel" data-v="0">No</button></div></div>
<div class="gban">${ic('lock',20)}<span>Everything you enter is stored on your device and encrypted.</span></div>`;
 return `<div class="pg nofab"><div class="row">${st>0?`<button class="ibtn" data-a="stepBack" aria-label="Back">${ic('back')}</button>`:''}<div class="pgs grow">${[0,1,2].map(i=>`<i class="${i<=st?'on':''}"></i>`).join('')}</div><span class="mono muted">${st+1}/3</span></div>${body}<button class="btn block" style="margin-top:auto" data-a="${st<2?'stepNext':'finishSetup'}">${st<2?'Continue':'Finish and enter'}</button></div>`};

SCREEN.home=()=>{const sc=score(),p=parts(),next=MS.find(m=>m>S.days)||365,prev=[0,...MS].filter(m=>m<=S.days).pop(),pct=clamp((S.days-prev)/(next-prev)*100,0,100);
 const R=44,C=2*Math.PI*R,q=QUOTES[S.qi%QUOTES.length],nm=S.user.name.trim()||'friend';
 const row=(l,v,m)=>`<div class="part"><span>${l}</span><div class="bar"><i style="width:${v/m*100}%"></i></div><b>${v}/${m}</b></div>`;
 return `<div class="pg"><header class="hd"><div class="hdt"><p class="eyebrow">${fmtDate()}</p><h1 style="margin-top:6px">Welcome back, ${esc(nm)}.</h1><p>Day <b class="mono t-leaf">${S.days}</b> of your recovery journey.</p></div><button class="ibtn" data-a="notif" aria-label="Notifications">${ic('bell')}<i class="dot"></i></button><button class="avatar" data-a="nav" data-r="settings" aria-label="Settings">${esc(nm[0].toUpperCase())}</button></header>
<section class="card hero"><svg class="ring" width="112" height="112" viewBox="0 0 100 100" role="img" aria-label="Recovery score ${sc} out of 100"><circle cx="50" cy="50" r="${R}" fill="none" stroke="var(--surface-2)" stroke-width="9"/><circle class="rg" cx="50" cy="50" r="${R}" fill="none" stroke="var(--leaf)" stroke-width="9" stroke-linecap="round" stroke-dasharray="${C.toFixed(1)}" style="--c:${C.toFixed(1)};--to:${(C*(1-sc/100)).toFixed(1)}" transform="rotate(-90 50 50)"/><text x="50" y="52" text-anchor="middle" font-family="var(--f-display)" font-weight="800" font-size="27" fill="var(--ink)">${sc}</text><text x="50" y="65" text-anchor="middle" font-family="var(--f-mono)" font-size="7" fill="var(--muted)" letter-spacing=".5">RECOVERY</text></svg>
<div class="parts">${row('Sobriety',p.sob,40)}${row('Check-ins',p.chk,20)}${row('Habits',p.hab,20)}${row('Community',p.com,20)}<span class="flame">${ic('flame',18)}<span class="mono">${S.streak}</span> day check-in streak</span></div></section>
<section class="tiles"><button class="tile" data-a="nav" data-r="scanIntro"><span class="ti">${ic('scan')}</span><div><b>ML scan</b><span>Check visible signs</span></div></button><button class="tile ar" data-a="nav" data-r="ar"><span class="ti">${ic('eye')}</span><div><b>AR visualizer</b><span>See your future face</span></div></button><button class="tile" data-a="nav" data-r="track" data-s="track:checkin"><span class="ti">${ic('track')}</span><div><b>Tracker</b><span>Log today in a minute</span></div></button><button class="tile em" data-a="nav" data-r="hub"><span class="ti">${ic('hub')}</span><div><b>Motivate me</b><span>Breathe, habits, goals</span></div></button></section>
${S.checkedToday?`<section class="card flat"><div class="row"><span class="t-good">${ic('check',24)}</span><div class="grow"><b>Checked in today</b><p class="muted">Nice work. Your streak is at ${S.streak}.</p></div></div></section>`:`<section class="card cta"><div class="row"><div class="grow"><h3>Daily check-in</h3><p class="muted">Mood, cravings and sleep. About a minute.</p></div><button class="btn sm" data-a="nav" data-r="track" data-s="track:checkin">Check in</button></div></section>`}
<section class="card"><div class="row sb"><h3>Next milestone</h3><span class="mono t-leaf">${next} days</span></div><div class="bar"><i style="width:${pct}%"></i></div><p class="muted">${next-S.days} days to go. ${S.days} days clean so far.</p></section>
<section class="qcard"><p class="eyebrow">Quote of the day</p><blockquote class="quote">${esc(q)}</blockquote><div class="row"><button class="react ${S.favs.includes(S.qi)?'on':''}" data-a="fav">${ic('heart',16)} Save</button><button class="react" data-a="speak" data-v="${esc(q)}">${ic('speaker',16)} Read aloud</button></div></section></div>`};

/* scan — routes photo selection through consent/questionnaire flow */
SCREEN.scanIntro=()=>`<div class="pg">${hdr('Photo intake & screening','Take a photo, then complete the screening questionnaire.')}
<div class="vf"><i class="cb tl"></i><i class="cb tr"></i><i class="cb bl"></i><i class="cb br"></i><div class="oval">${S.scan.photo?`<img src="${S.scan.photo}" alt="Selected photo">`:`<svg viewBox="0 0 120 160" fill="none" stroke="var(--lumen)" stroke-width="1.5" opacity=".6"><ellipse cx="60" cy="72" rx="34" ry="44"/><path d="M20 160c4-26 22-34 40-34s36 8 40 34"/></svg>`}</div><div class="beam"></div><p class="vfcap">${S.scan.photo?'PHOTO PREVIEW — DEVICE ONLY':'OPTIONAL — FACE IN OVAL'}</p></div>
<div class="gban">${ic('lock',20)}<span>Your photo stays on this device only and is never uploaded. It is used for session reference, not substance-use analysis.</span></div>
${S.scan.photo?`<div class="card flat"><div class="row sb"><span class="tag t-good">Photo captured</span><button class="btn ghost sm" data-a="removePhoto">${ic('trash',16)} Remove photo</button></div><p style="font-size:12.5px;color:var(--muted)">Photo preview is ready. No substance or diagnostic analysis is performed on your photo.</p></div>
<button class="btn block" data-a="nav" data-r="consent">Continue to privacy & consent →</button>
<div class="row2"><label class="btn ghost"><input class="vh" type="file" accept="image/*" capture="user" data-file="1">${ic('camera')} Retake</label><label class="btn ghost"><input class="vh" type="file" accept="image/*" data-file="1">${ic('upload')} Pick different</label></div>`:`<ul class="tips"><li>${ic('sparkle',18)}Face a window or soft light. Avoid harsh shadows.</li><li>${ic('eye',18)}Remove glasses and keep a neutral expression.</li><li>${ic('user',18)}Hold the phone at eye level.</li></ul>
<div class="row2"><label class="btn"><input class="vh" type="file" accept="image/*" capture="user" data-file="1">${ic('camera')} Take selfie</label><label class="btn ghost"><input class="vh" type="file" accept="image/*" data-file="1">${ic('upload')} Upload</label></div>
<button class="btn soft block" data-a="goConsent">Skip photo — go straight to screening</button>
<p class="muted ctr" style="font-size:12px">The photo is optional. Selecting one will let you preview, retake, or remove before screening.</p>`}
${S.screening&&S.screening.done?`<button class="link ctr" data-a="nav" data-r="screenResult">View my last screening result</button>`:''}
${S.scan.done?`<button class="link ctr" data-a="nav" data-r="result">View last visual severity result</button>`:''}</div>`;

SCREEN.analyzing=()=>{const items=['Skin texture','Eye condition','Muscle tone and symmetry','Signs of malnourishment','Lip and gum colour'];
 return `<div class="pg nofab" style="align-items:center;text-align:center"><div><h1 style="font-size:26px">Analysing</h1><p class="sub">On-device model. Nothing leaves your phone.</p></div>
<div class="vf" style="width:100%"><i class="cb tl"></i><i class="cb tr"></i><i class="cb bl"></i><i class="cb br"></i><div class="oval">${S.scan.photo?`<img src="${S.scan.photo}" alt="">`:faceSVG({key:S.ar.sub,D:.14+.3*S.scan.sev/100,uid:'sc'})}${MESH}</div><div class="beam"></div><p class="vfcap mono">TRACKING 468 LANDMARKS</p></div>
<ul class="chk" style="align-self:stretch;text-align:left">${items.map((t,i)=>`<li id="ck${i}"><span class="st">${ic('check',14)}</span>${t}</li>`).join('')}</ul></div>`};
AFTER.analyzing=()=>{for(let i=0;i<5;i++)later(()=>{const e=$('#ck'+i);if(e)e.classList.add('ok')},500+i*650);later(()=>nav('result'),500+5*650+300)};

const resDyn=()=>{const v=S.scan.sev,L=lvl(v),conf=88+v%7,off=[8,-6,3,-10,12],nm=['Skin texture','Eye condition','Muscle tone','Nutrition signs','Lip and gum'];
 return `<div class="ctr"><div class="bign t-${L.c}">${v}%</div><p style="margin-top:4px"><b class="t-${L.c}">${L.k} RISK</b> <span class="muted">· Confidence ${conf}%</span></p></div><p>${L.d}</p>
${v>=70?`<div class="crisis"><b>Please talk to someone today</b><p>You don’t have to work this out alone. A trained person can help you plan the next step.</p><button class="btn ember sm" data-a="sos">Get support now</button></div>`:''}
<div class="card flat"><h3 style="font-size:15px">What the model looked at</h3>${nm.map((n,i)=>{const x=clamp(v+off[i],4,98);return `<div class="bm"><span>${n}</span><div class="bar ${x>=70?'ember':''}"><i style="width:${x}%"></i></div><b>${x}</b></div>`}).join('')}</div>
<p class="disc">${ic('info',18)}<span>This is an AI-assisted assessment, not a medical diagnosis. Please consult a healthcare professional.</span></p>`};
SCREEN.result=()=>{S.scan.done=true;return `<div class="pg">${hdr('Severity result','Based on visible signs only.',{back:'scanIntro'})}
<section class="card"><svg class="gauge" viewBox="0 0 220 130" role="img" aria-label="Severity gauge"><path d="M20 110A90 90 0 0 1 200 110" pathLength="100" fill="none" stroke="var(--good)" stroke-width="14" stroke-dasharray="38.4 61.6"/><path d="M20 110A90 90 0 0 1 200 110" pathLength="100" fill="none" stroke="var(--warn)" stroke-width="14" stroke-dasharray="28.4 71.6" stroke-dashoffset="-40.6"/><path d="M20 110A90 90 0 0 1 200 110" pathLength="100" fill="none" stroke="var(--bad)" stroke-width="14" stroke-dasharray="28.4 71.6" stroke-dashoffset="-70.6"/><g id="needle"><line x1="110" y1="110" x2="110" y2="38" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/></g><circle cx="110" cy="110" r="8" fill="var(--ink)"/><text x="20" y="128" text-anchor="middle" font-family="var(--f-mono)" font-size="9" fill="var(--muted)">0</text><text x="200" y="128" text-anchor="middle" font-family="var(--f-mono)" font-size="9" fill="var(--muted)">100</text></svg>
<div id="resDyn" style="display:flex;flex-direction:column;gap:12px">${resDyn()}</div></section>
<div class="row2"><button class="btn" data-a="nav" data-r="arEnhanced">${ic('camera')} Live AR face tracking</button><button class="btn ghost" data-a="plan">Start recovery plan</button></div>
<section class="card flat"><label class="fld"><span>Prototype control: set a demo severity</span><input type="range" min="0" max="100" value="${S.scan.sev}" data-i="sev" style="--p:${S.scan.sev}%"></label><p class="muted" style="font-size:12.5px">The real model outputs this value. Drag to preview Low, Medium and High.</p></section></div>`};
AFTER.result=()=>{award('first');requestAnimationFrame(()=>requestAnimationFrame(()=>{const n=$('#needle');if(n)n.style.transform=`rotate(${-90+S.scan.sev*1.8}deg)`}))};

/* AR */
const arDyn=()=>{const a=S.ar,sev=S.scan.sev/100,y=a.years,p=a.path,f=y/20,P=PROF[a.sub]||PROF.Alcohol;
 const now=face({key:a.sub,D:Dof(0,p,sev),uid:'n',glow:0,gray:0}),fut=face({key:a.sub,D:Dof(y,p,sev),uid:'f',glow:p==='rec'?f:0,gray:f});
 const stage=(y>0&&a.split)?cmp(now,fut,'NOW','+'+y+' YRS','ar'):`<div class="cmp one"><div class="ly">${y>0?fut:now}</div></div>`;
 const L=p==='use'?P.labels:POSL,n=y===0?0:Math.max(1,Math.round(y/20*L.length));
 const msg=y===0?'This is you today.':p==='use'?`This is your face in ${y} years if use continues. You can change this.`:`This is your face in ${y} years with recovery. You are already on the way.`;
 return `<div class="arstage"><i class="cb tl"></i><i class="cb tr"></i><i class="cb bl"></i><i class="cb br"></i><div class="beam"></div><div class="fc">${stage}${MESH}</div></div>
<div class="dlab" aria-live="polite">${L.slice(0,n).map(t=>`<span class="${p==='rec'?'pos':''}">${t}</span>`).join('')}</div><p class="note">${msg}</p>`};
SCREEN.ar=()=>{
 if(window.SCREEN_arEnhanced)return window.SCREEN_arEnhanced();
 const a=S.ar;return `<div class="ar"><header class="hd"><button class="ibtn" data-a="nav" data-r="home" aria-label="Back">${ic('back')}</button><div class="hdt"><h1 style="font-size:22px">AR visualiser</h1><p>ILLUSTRATIVE · NOT A PREDICTION</p></div><button class="sospill" data-a="sos">SOS</button></header>
<div class="are-disc" style="margin:0 0 4px">${ic('info',14)}<span style="font-size:11.5px">Educational illustration — not an individual prediction. The avatar uses a stylised face, not a real face-ageing model.</span></div>
<div class="pills">${ARSUBS.map(s=>`<button class="chip ${a.sub===s?'on':''}" data-a="arSub" data-v="${s}">${s}</button>`).join('')}</div>
<div id="arDyn" style="display:flex;flex-direction:column;gap:12px">${arDyn()}</div>
<section class="arpanel"><div class="seg"><button class="${a.path==='use'?'on':''}" data-a="arPath" data-v="use">If harmful pattern continues</button><button class="${a.path==='rec'?'on':''}" data-a="arPath" data-v="rec">If I seek support</button></div>
<div><div class="row sb"><b>Time (educational stage)</b><span class="mono" id="yrl">${a.years===0?'Today':'+'+a.years+' years'}</span></div><input type="range" id="yr" min="0" max="20" step="5" value="${a.years}" data-i="years" style="--p:${a.years*5}%" aria-label="Years into the future"><div class="ticks"><span>Now</span><span>5</span><span>10</span><span>15</span><span>20 yrs</span></div></div>
<div class="row sb"><span>Split view (drag the divider)</span><label class="sw"><input type="checkbox" ${a.split?'checked':''} data-c="arSplit" aria-label="Split view"><span></span></label></div></section>
<div class="row2"><button class="btn ghost" data-a="arShare">${ic('share')} Share</button><button class="btn" data-a="arChange">I want to change</button></div>
<div style="border-top:1px solid rgba(255,255,255,.1);padding-top:12px;margin-top:4px">
<button class="btn" style="width:100%;background:rgba(52,208,226,.18);border:1px solid var(--lumen);color:var(--lumen)" data-a="nav" data-r="arEnhanced">${ic('sparkle',16)} Live face pinpoint tracking & symptoms →</button>
<p style="font-size:11.5px;color:var(--cam-mut);margin-top:6px;text-align:center">Pinpoints eyes, nose, mouth, skin & jaw with checkboxes and year-by-year symptoms</p></div></div>`};
AFTER.ar=()=>{award('face');if(window.AFTER&&window.AFTER.arEnhanced)window.AFTER.arEnhanced()};

/* tracker */
const moodIcon=(k,s=30)=>{const m={happy:'<path d="M8 14.5Q12 18 16 14.5"/>',neutral:'<path d="M8.5 15.5H15.5"/>',anxious:'<path d="M8 16q1-1.500 2 0t2 0 2 0 2 0"/><path d="M7.500 8.200l3 1M16.500 8.200l-3 1"/>',craving:'<ellipse cx="12" cy="15.500" rx="2" ry="2.200"/>',struggling:'<path d="M8 17Q12 13 16 17"/><path d="M7.500 9.500l3-1M16.500 9.500l-3-1"/>'};
 return `<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.500"/><circle cx="9" cy="10.500" r=".6" fill="currentColor"/><circle cx="15" cy="10.500" r=".6" fill="currentColor"/>${m[k]}</svg>`};
const cravLabel=v=>v<=1?'Calm':v<=3?'Mild':v<=6?'Noticeable':v<=8?'Strong':'Intense';
SCREEN.track=()=>{const s=S.sub.track;return `<div class="pg">${hdr('Recovery tracker','Day '+S.days+' · '+fmtDate())}<div class="seg">${[['checkin','Check-in'],['dash','Dashboard'],['prog','Progress']].map(([k,l])=>`<button class="${s===k?'on':''}" data-a="sub" data-g="track" data-v="${k}">${l}</button>`).join('')}</div>${TRK[s]()}</div>`};
TRK.checkin=()=>{
 if(S.checkedToday){const m=MOODS.find(x=>x[0]===S.mood);return `<section class="card cta"><div class="row"><span class="t-good">${ic('check',28)}</span><div class="grow"><h3>Today is logged</h3><p class="muted">+1 streak point. See you tomorrow.</p></div></div></section>
<section class="card"><h3>Today’s summary</h3><div class="kv"><span class="muted">Mood</span><b>${m?m[1]:'-'}</b></div><div class="kv"><span class="muted">Craving</span><b class="mono">${S.craving}/10 · ${cravLabel(S.craving)}</b></div><div class="kv"><span class="muted">Used today</span><b>${({no:'No',partial:'Partial',yes:'Yes'})[S.used]||'-'}</b></div><div class="kv"><span class="muted">Sleep · Water · Exercise</span><b class="mono">${S.sleep}h · ${S.water} · ${S.exercise?'Yes':'No'}</b></div></section><button class="btn ghost block" data-a="nav" data-r="hub" data-s="hub:breathe">${ic('wind')} Do a breathing break</button>`}
 return `<section class="card"><h3>How are you feeling?</h3><div class="moods">${MOODS.map(([k,l])=>`<button class="mood ${S.mood===k?'on':''}" data-a="mood" data-v="${k}" aria-pressed="${S.mood===k}">${moodIcon(k)}${l}</button>`).join('')}</div></section>
<section class="card"><div class="row sb"><h3>Craving intensity</h3><span><b class="mono" id="cv">${S.craving}</b><span class="muted">/10 · </span><span id="cvl">${cravLabel(S.craving)}</span></span></div><input class="hot" type="range" min="0" max="10" value="${S.craving}" data-i="craving" style="--p:${S.craving*10}%" aria-label="Craving intensity"></section>
<section class="card"><h3>Did you use today?</h3><div class="seg">${[['no','No'],['partial','Partial'],['yes','Yes']].map(([k,l])=>`<button class="${S.used===k?'on':''}" data-a="used" data-v="${k}">${l}</button>`).join('')}</div></section>
<section class="card"><h3>Physical wellness</h3><div class="row sb"><span class="row">${ic('moon',20)} Sleep</span><div class="stepper"><button data-a="sleep" data-v="-0.5" aria-label="Less sleep">${ic('minus',16)}</button><b class="mono">${S.sleep}h</b><button data-a="sleep" data-v="0.5" aria-label="More sleep">${ic('plus',16)}</button></div></div>
<div><div class="row sb" style="margin-bottom:8px"><span class="row">${ic('drop',20)} Water</span><span class="mono muted">${S.water} glasses</span></div><div class="drops">${Array.from({length:8},(_,i)=>`<button class="${i<S.water?'on':''}" data-a="water" data-v="${i+1}" aria-label="${i+1} glasses">${ic('drop',16)}</button>`).join('')}</div></div>
<div class="row sb"><span class="row">${ic('run',20)} Exercise today</span><label class="sw"><input type="checkbox" ${S.exercise?'checked':''} data-c="exercise" aria-label="Exercised today"><span></span></label></div></section>
<label class="fld"><span>Note (optional)</span><textarea class="in" id="note" data-bind="note" placeholder="Anything worth remembering about today?">${esc(S.note)}</textarea></label>
<button class="btn block" data-a="submitCheckin">Log today’s check-in</button>`};

const heat=()=>{const n=new Date(),y=n.getFullYear(),m=n.getMonth(),dim=new Date(y,m+1,0).getDate(),first=(new Date(y,m,1).getDay()+6)%7,td=n.getDate();let c='';
 ['M','T','W','T','F','S','S'].forEach(d=>{c+=`<i class="h">${d}</i>`});for(let i=0;i<first;i++)c+='<i class="h"></i>';
 for(let d=1;d<=dim;d++){if(d>td){c+=`<i style="opacity:.35">${d}</i>`;continue}const w=new Date(y,m,d).getDay();let v=3+((d*7)%4)-Math.floor(d/9)+(w===5?3:0)+(w===6?2:0);if(d===td&&S.checkedToday)v=S.craving;v=clamp(v,0,10);const l=v<=1?0:v<=3?1:v<=5?2:v<=7?3:4;c+=`<i class="${d===td?'today':''}" style="background:color-mix(in srgb,var(--ember) ${[0,22,42,66,90][l]}%,var(--surface-2))" title="Day ${d}: craving ${v}">${d}</i>`}
 return c};
const moodChart=()=>{const W=320,H=140,pl=30,pr=10,pt=10,pb=24,n=7,st=(W-pl-pr)/(n-1),yv=v=>pt+(5-v)/4*(H-pt-pb);const mm=MOODS.find(x=>x[0]===S.mood);const vals=[...S.moodWeek,mm?mm[2]:null];
 const lab=[];for(let i=6;i>=0;i--){lab.push(new Date(Date.now()-i*864e5).toLocaleDateString('en-GB',{weekday:'short'}).slice(0,2))}
 const pts=vals.map((v,i)=>v==null?null:[pl+i*st,yv(v)]),ok=pts.filter(Boolean),d=ok.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join('');
 const area=d+`L${ok[ok.length-1][0].toFixed(1)} ${H-pb}L${ok[0][0].toFixed(1)} ${H-pb}Z`;
 return `<svg class="chart" viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Mood over the last seven days"><defs><linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--leaf)" stop-opacity=".3"/><stop offset="1" stop-color="var(--leaf)" stop-opacity="0"/></linearGradient></defs>
${[1,3,5].map(v=>`<line x1="${pl}" x2="${W-pr}" y1="${yv(v)}" y2="${yv(v)}" stroke="var(--line)" stroke-dasharray="3 4"/><text x="${pl-6}" y="${yv(v)+3}" text-anchor="end">${['','Low','','Okay','','Good'][v]}</text>`).join('')}
<path d="${area}" fill="url(#mg)"/><path d="${d}" fill="none" stroke="var(--leaf)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
${pts.map((p,i)=>p?`<circle cx="${p[0]}" cy="${p[1]}" r="${i===6?6:3.5}" fill="${i===6?'var(--leaf)':'var(--surface)'}" stroke="var(--leaf)" stroke-width="2"/>`:`<circle cx="${pl+i*st}" cy="${yv(3)}" r="5" fill="none" stroke="var(--muted)" stroke-dasharray="2 3"/>`).join('')}
${lab.map((l,i)=>`<text x="${pl+i*st}" y="${H-6}" text-anchor="middle">${l}</text>`).join('')}</svg>`};
const useChart=()=>{const used=[22,18,14,10,6,0],tot=[31,30,31,31,30,30],W=320,H=150,bw=34,gap=(W-6*bw)/7,ph=100,mx=31,now=new Date();
 const lab=[];for(let i=5;i>=0;i--){lab.push(new Date(now.getFullYear(),now.getMonth()-i,1).toLocaleDateString('en-GB',{month:'short'}))}
 return `<svg class="chart" viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Days used versus days clean per month">${used.map((u,i)=>{const x=gap+i*(bw+gap),ch=(tot[i]-u)/mx*ph,uh=u/mx*ph,yb=H-24;return `<rect x="${x}" y="${yb-ch}" width="${bw}" height="${ch}" rx="5" fill="var(--leaf)"/>${u?`<rect x="${x}" y="${yb-ch-uh}" width="${bw}" height="${uh}" rx="5" fill="var(--ember)"/>`:''}<text x="${x+bw/2}" y="${yb-ch-uh-5}" text-anchor="middle">${u}</text><text x="${x+bw/2}" y="${H-8}" text-anchor="middle">${lab[i]}</text>`}).join('')}</svg>`};
const dots=(a,tod)=>`<div class="dots7">${[...a,tod].map(v=>`<i class="${v?'y':''}">${v?ic('check',12):''}</i>`).join('')}</div>`;
TRK.dash=()=>{const ct=S.checkedToday;const m=[7,30,60,90,180,365].slice(0,6);
 return `<section class="card"><div class="row sb"><div><p class="eyebrow">Sobriety counter</p><div class="big t-leaf mono">${S.days}<span style="font-size:16px" class="muted"> days clean</span></div></div><span class="flame">${ic('flame',20)}<span class="mono">${S.streak}</span></span></div>
<ol class="ms">${m.map((d,i)=>{const done=S.days>=d,nx=!done&&(i===0||S.days>=m[i-1]);return `<li class="${done?'done':nx?'next':''}"><span class="c">${done?ic('check',14):''}</span>${d>=365?'1y':d+'d'}</li>`}).join('')}</ol></section>
<section class="card"><h3>Mood this week</h3>${moodChart()}</section>
<section class="card"><div class="row sb"><h3>Craving heatmap</h3><div class="legend">Low<i style="background:color-mix(in srgb,var(--ember) 22%,var(--surface-2))"></i><i style="background:color-mix(in srgb,var(--ember) 66%,var(--surface-2))"></i><i style="background:var(--ember)"></i>High</div></div><div class="hm">${heat()}</div><p class="muted" style="font-size:12.5px">Fridays and Saturdays run hotter. That pattern drives your trigger plan below.</p></section>
<section class="card"><div class="row sb"><h3>Days used vs clean</h3><div class="legend"><i style="background:var(--leaf)"></i>Clean<i style="background:var(--ember)"></i>Used</div></div>${useChart()}</section>
<section class="card"><h3>Wellness streaks</h3>${[['Sleep 7h+','moon',[1,1,1,0,1,1],ct&&S.sleep>=7],['Water 6+ glasses','drop',[1,1,0,1,1,1],ct&&S.water>=6],['Exercise','run',[0,1,1,0,1,1],ct&&S.exercise]].map(([l,i,a,t])=>`<div class="row sb"><span class="row">${ic(i,20)}<span>${l}</span></span>${dots(a,t)}</div>`).join('')}</section>
<section class="card"><div class="row sb"><h3>Trigger map</h3><button class="btn soft sm" data-a="trig">${ic('plus',16)} Log</button></div>${S.triggers.map(t=>`<div class="trig"><span class="tag">${t[0]}</span><div><div style="font-weight:600">${esc(t[1])}</div><div class="bar ember" style="margin-top:4px"><i style="width:${t[2]/8*100}%"></i></div></div><b class="mono">${t[2]}</b></div>`).join('')}
<div class="gban">${ic('sparkle',20)}<span>Fridays 6 to 10 pm are your highest-risk window. Plan one thing for tonight, like a walk with ${esc(S.user.ecName||'a friend')}.</span></div></section>
<section class="card"><div class="row sb"><h3>Weekly report</h3><span class="tag t-good">Improving</span></div><p>${Math.min(S.streak,7)} of 7 check-ins. No use logged. Average mood 3.3 out of 5. Cravings peaked on Friday evening.</p><div class="row2"><button class="btn soft sm" data-a="shareReport">${ic('file',16)} Share report</button><button class="btn ghost sm" data-a="toast" data-v="PDF export ships with the full app">${ic('download',16)} PDF</button></div></section>
<section class="card"><h3>Badges</h3><div class="badges">${BADGES.map(([k,n,d,i])=>`<div class="bdg ${S.badges[k]?'on':''}"><span class="hx">${ic(i,24)}</span><span>${n}</span></div>`).join('')}</div></section>`};
TRK.prog=()=>{const sev=S.scan.sev/100,key=S.ar.sub,base=.12+.30*sev,d1=base+.12,d34=base*.45;
 const lock=S.bio&&!S.gUnlocked?`<div class="lock">${ic('lock',32)}<b>Memory gallery is locked</b><span style="font-size:13px;color:var(--cam-mut)">Photos are stored on this device only.</span><button class="btn sm" data-a="unlock">${ic('scan',16)} Unlock with Face ID</button></div>`:'';
 return `<section class="card"><h3>Before and after</h3><p class="muted">Real change you can see. Drag the divider.</p><div class="cmpbox">${lock}<div class="fc"><div class="cmp" data-store="" style="--pos:50%"><div class="ly">${faceSVG({key,D:d34,uid:'p2',glow:.5,gray:0})}</div><div class="ly top">${faceSVG({key,D:d1,uid:'p1',glow:0,gray:0})}</div><span class="tg l">DAY 1</span><span class="tg r">DAY ${S.days}</span><div class="dv" style="left:var(--pos)"><b>${ic('chevron',18)}</b></div></div></div></div></section>
<section class="card"><h3>Weekly selfies</h3><div class="thumbs">${[0,1,2,3,4].map(i=>`<div>${faceSVG({key,D:d1+(d34-d1)*i/4,uid:'t'+i,glow:i/8,gray:0})}<span>WK ${i+1}</span></div>`).join('')}</div><p class="muted" style="font-size:12.5px">The gallery is the counterweight to the AR warning. It shows what recovery gives back.</p></section>`};

/* hub */
SCREEN.hub=()=>{const s=S.sub.hub;return `<div class="pg">${hdr('Motivate me','Small daily things that keep you going.')}<div class="pills">${[['today','Today'],['breathe','Breathe'],['habits','Habits'],['goals','Goals'],['stories','Stories'],['coach','Coach']].map(([k,l])=>`<button class="pill ${s===k?'on':''}" data-a="sub" data-g="hub" data-v="${k}">${l}</button>`).join('')}</div>${HUB[s]()}</div>`};
AFTER.hub=()=>{if(S.sub.hub==='coach'){const c=$('.chat');if(c)c.scrollTop=c.scrollHeight}};
HUB.today=()=>{const q=QUOTES[S.qi%QUOTES.length];return `<section class="qcard"><p class="eyebrow">Today’s affirmation</p><blockquote class="quote" style="font-size:24px">${esc(q)}</blockquote><div class="row"><button class="react ${S.favs.includes(S.qi)?'on':''}" data-a="fav">${ic('heart',16)} ${S.favs.includes(S.qi)?'Saved':'Save'}</button><button class="react" data-a="speak" data-v="${esc(q)}">${ic('speaker',16)} Read aloud</button></div></section>
<p class="muted" style="font-size:12.5px">A new line arrives every 24 hours, with a morning notification.</p>
${S.favs.length?`<section class="card"><h3>Your collection</h3>${S.favs.map(i=>`<p style="padding-top:8px;border-top:1px solid var(--line)">${esc(QUOTES[i])}</p>`).join('')}</section>`:''}
<section class="card cta"><div class="row"><span class="t-leaf">${ic('wind',26)}</span><div class="grow"><b>Craving right now?</b><p class="muted">A 60-second breathing break often takes the edge off.</p></div><button class="btn sm" data-a="sos">Start</button></div></section>`};
HUB.breathe=()=>`<section class="card ctr"><h3>4-7-8 breathing</h3><p class="muted">Breathe in for 4, hold for 7, breathe out for 8. Helps interrupt a craving.</p><div class="bwrap" id="bw"><div class="bcircle"></div><div class="bmid"><b class="bphase">Ready</b><span class="bcount"></span></div></div><p class="mono muted btime">0:00</p><button class="btn block" id="bbtn" data-a="breath">Start</button></section>
<section class="card"><h3>Guided sessions</h3>${[['5-minute mindfulness','Audio-led, eyes closed'],['Body scan','For withdrawal discomfort'],['Urge surfing','Ride out a craving']].map(([t,d])=>`<div class="hl"><div class="grow"><b>${t}</b><p class="muted">${d}</p></div><button class="btn soft sm" data-a="toast" data-v="Audio sessions ship in the full app">${ic('speaker',16)}</button></div>`).join('')}</section>`;
HUB.habits=()=>`<section class="card flat"><div class="row sb"><span>Habits count for 20% of your Recovery Score</span><b class="mono t-leaf">${score()}</b></div></section>${S.habits.map((h,i)=>`<button class="hab ${h.d?'on':''}" data-a="habit" data-v="${i}" aria-pressed="${h.d}"><span class="bx">${h.d?ic('check',16):''}</span><span class="nm grow">${esc(h.n)}</span><span class="flame mono">${ic('flame',16)}${h.s+(h.d?1:0)}</span></button>`).join('')}
${S.habits.length<5?`<form data-form="habit" class="send"><input class="in" id="hn" placeholder="Add a habit (up to 5)" aria-label="New habit"><button class="btn" type="submit">${ic('plus',18)}</button></form>`:'<p class="muted ctr">You have 5 habits. That’s the limit, on purpose.</p>'}`;
HUB.goals=()=>['1 week','1 month','6 months +'].map(t=>`<section class="card"><h3>${t==='1 week'?'This week':t==='1 month'?'This month':'Six months and beyond'}</h3>${S.goals.map((g,i)=>g.t===t?`<div style="display:flex;flex-direction:column;gap:8px;padding-top:8px;border-top:1px solid var(--line)"><div class="row sb"><b>${esc(g.n)}${g.by?` <span class="tag">${g.by}</span>`:''}</b>${g.p>=g.m?`<span class="t-good burst">${ic('check',22)}</span>`:`<button class="btn soft sm" data-a="goal" data-v="${i}">+1</button>`}</div><div class="bar"><i style="width:${clamp(g.p/g.m*100,0,100)}%"></i></div><span class="mono muted" style="font-size:12px">${g.p} of ${g.m}</span></div>`:'').join('')}</section>`).join('');
const STORIES=[['Alcohol','5+ years','I used to count the days until Friday. Now I count the days I’ve kept a promise to myself. Day 212. The first month was loud, the third was quiet in a good way.'],['Opioids','2–5 years','Treatment with medication plus counselling is what finally held for me. I wish I’d asked a doctor sooner instead of white-knuckling it.'],['Stimulants','6 months–2 years','I thought I could stop alone. I couldn’t, and that’s fine. A peer group on Tuesdays changed everything.'],['Cannabis','2–5 years','I wasn’t “that bad” until I noticed I hadn’t had a sober weekend in two years. Day 61 now.'],['Alcohol','6 months–2 years','I relapsed at day 90 and it felt like starting over. My counsellor said day 90 still happened. She was right.'],['Sedatives','2–5 years','Tapering with my doctor’s help took four months. Slow and supervised was the only way that worked.']];
HUB.stories=()=>{const f=S.sf;return `<div class="pills">${['All','Alcohol','Opioids','Stimulants','Cannabis','Sedatives'].map(x=>`<button class="pill ${f===x?'on':''}" data-a="sf" data-v="${x}">${x}</button>`).join('')}</div>${STORIES.map((s,i)=>({s,i})).filter(o=>f==='All'||o.s[0]===f).map(({s,i})=>{const r=S.react[i]||{};return `<section class="card story"><div class="row"><span class="tag">${s[0]}</span><span class="tag">${s[1]}</span><span class="muted" style="font-size:12px">Anonymous</span></div><p>${s[2]}</p><div class="row"><button class="react ${r.h?'on':''}" data-a="react" data-i="${i}" data-v="h">${ic('heart',16)} ${12+i*7+(r.h?1:0)}</button><button class="react ${r.s?'on':''}" data-a="react" data-i="${i}" data-v="s">${ic('bolt',16)} ${5+i*4+(r.s?1:0)}</button></div></section>`}).join('')}`};
HUB.coach=()=>`<div class="gban">${ic('info',20)}<span>Prototype replies are rule-based. The full app uses an LLM with clinical guardrails.</span></div>
<div class="chat" id="chat">${S.chat.map(m=>`<div class="msg ${m.r==='u'?'u':'b'}">${m.typing?'<span class="typing"><i></i><i></i><i></i></span>':esc(m.t)}${m.act?`<br><button class="btn sm" data-a="${m.act[0]}" ${m.act[2]?`data-r="${m.act[2]}"`:''}>${m.act[1]}</button>`:''}</div>`).join('')}</div>
<div class="pills">${['I’m craving right now','What is withdrawal like?','Tell me about medication-assisted treatment'].map(t=>`<button class="chip" data-a="coachQ" data-v="${esc(t)}">${t}</button>`).join('')}</div>
<form data-form="chat" class="send"><input class="in" id="cin" placeholder="Message your coach" aria-label="Message your coach" autocomplete="off"><button class="btn" type="submit" aria-label="Send">${ic('send',18)}</button></form>`;

/* community */
SCREEN.comm=()=>{const s=S.sub.comm;return `<div class="pg">${hdr('Community','Anonymous, positive-only support.')}<div class="seg">${[['forum','Forum'],['buddy','Buddy'],['help','Get help']].map(([k,l])=>`<button class="${s===k?'on':''}" data-a="sub" data-g="comm" data-v="${k}">${l}</button>`).join('')}</div>${COM[s]()}</div>`};
COM.forum=()=>`<section class="card"><div class="row sb"><span class="muted">Posting as</span><b class="mono">${S.anon}</b></div><div class="chips">${['craving','relapse','milestone','advice'].map(t=>`<button class="chip ${S.postTag===t?'on':''}" data-a="ptag" data-v="${t}">#${t}</button>`).join('')}</div><form data-form="post" style="display:flex;flex-direction:column;gap:10px"><textarea class="in" id="pt" data-i="postText" placeholder="Share a win, a craving, or a question" aria-label="Write a post"></textarea><div id="crisisBox"></div><button class="btn" type="submit">Post anonymously</button></form><p class="muted" style="font-size:12.5px">An AI filter and human moderators review every post. Posts with crisis language get support first.</p></section>
${S.feed.map(p=>`<section class="card post"><div class="row sb"><span class="uname">${p.u}</span><span class="muted mono" style="font-size:12px">${p.t}</span></div><div><span class="tag">#${p.tag}</span></div><p>${esc(p.txt)}</p><div class="row"><button class="react ${p.mine?'on':''}" data-a="support" data-v="${p.id}">${ic('heart',16)} ${p.sup+(p.mine?1:0)} Support</button><span class="muted">${ic('chat',16)} ${p.rep}</span></div></section>`).join('')}`;
COM.buddy=()=>{if(!S.buddy)return `<section class="card ctr" style="align-items:center"><span class="t-leaf">${ic('people',40)}</span><h3>Find an accountability buddy</h3><p class="muted">We pair you with another anonymous person at a similar stage. Messages are end-to-end encrypted. Opt in or out any time.</p>${S.pairing?`<p class="mono t-leaf">Finding a match…</p>`:`<button class="btn block" data-a="optBuddy">Opt in</button>`}</section>`;
 return `<section class="card"><div class="row"><span class="avatar" style="background:var(--lumen)">S</span><div class="grow"><b class="mono">SteadyOak_1180</b><p class="muted">Day 29 · Alcohol · matched this week</p></div><span class="tag">${ic('lock',12)} E2E</span></div></section>
<div class="gban">${ic('sparkle',20)}<span>Weekly check-in: how is your buddy doing this week?</span></div>
<div class="chat" id="bchat">${S.buddyMsgs.map(m=>`<div class="msg ${m.r==='u'?'u':'b'}">${esc(m.t)}</div>`).join('')}</div>
<div class="pills">${['Proud of you','Tough day today','Walk tonight?'].map(t=>`<button class="chip" data-a="buddyQ" data-v="${t}">${t}</button>`).join('')}</div>
<form data-form="buddy" class="send"><input class="in" id="bin" placeholder="Message your buddy" aria-label="Message your buddy" autocomplete="off"><button class="btn" type="submit" aria-label="Send">${ic('send',18)}</button></form><p class="muted" style="font-size:12.5px">Demo buddy. Replies are simulated.</p>`};
COM.help=()=>`<section class="crisis"><b>Need to talk right now?</b><p>Call someone you trust, or reach a helpline. If you are in immediate danger, call your local emergency number.</p><div class="row2"><a class="btn ember" href="tel:${esc(S.user.ecNum.replace(/[^+\d]/g,''))}">${ic('phone',18)} Call ${esc(S.user.ecName||'contact')}</a><button class="btn ghost" data-a="copy" data-v="${esc(S.user.ecNum)}">${ic('copy',18)} Copy number</button></div><span class="num">${esc(S.user.ecNum)}</span></section>
<section class="card"><h3>Helplines</h3>${HELP.map(h=>`<div class="hl"><div class="grow"><b>${h[1]}</b><p class="muted">${h[0]}</p><span class="num">${h[2]}</span></div><button class="btn soft sm" data-a="copy" data-v="${h[2]}">${ic('copy',16)}</button></div>`).join('')}<p class="muted" style="font-size:12px">Example numbers. Verify them for your region before launch.</p></section>
<button class="btn block" data-a="crisisChat">${ic('chat',18)} Chat with a trained peer counselor</button>
<section class="card"><h3>Find a counselor</h3>${[['Dr. Meera Rao','Addiction psychiatry · Online','Today, 6:30 pm'],['Kabir Nair, LMHC','CBT and relapse prevention · Chennai','Tomorrow, 11:00 am'],['Sana Thomas','Family counselling · Online','Sat, 10:00 am']].map((c,i)=>`<div class="hl"><span class="avatar" style="background:var(--lumen)">${c[0].replace('Dr. ','')[0]}</span><div class="grow"><b>${c[0]}</b><p class="muted">${c[1]}</p><span class="mono t-leaf" style="font-size:12px">${c[2]}</span></div><button class="btn soft sm" data-a="book" data-v="${i}">Book</button></div>`).join('')}</section>`;

/* guardian, settings, family */
SCREEN.guardian=()=>{const g=S.guard==='guardian',sh=S.share;return `<div class="pg nofab">${hdr('Guardian view','What a trusted person can see.',{back:'settings'})}
<div class="gban">${ic('eye',20)}<span>View-only. Shared with ${esc(S.user.name)}’s consent. They can change this any time.</span></div>
<div class="seg"><button class="${g?'on':''}" data-a="guardTab" data-v="guardian">Guardian</button><button class="${g?'':'on'}" data-a="guardTab" data-v="clinician">Clinician</button></div>
${g?`<section class="card">${sh.sob?`<div class="kv"><span class="muted">Days clean</span><b class="mono">${S.days}</b></div>`:''}${sh.chk?`<div class="kv"><span class="muted">Today’s check-in</span><b class="${S.checkedToday?'t-good':'t-warn'}">${S.checkedToday?'Completed':'Not yet'}</b></div><p class="muted" style="font-size:12.5px">Mood and journal content are never shown.</p>`:''}${sh.mil?`<div class="kv"><span class="muted">Milestones</span><b>${Object.values(S.badges).filter(Boolean).length} of 7 badges</b></div>`:''}${sh.sos?`<div class="kv"><span class="muted">SOS alerts this week</span><b>${S.sosCount||0}</b></div>`:''}${sh.wk?`<div class="kv"><span class="muted">Weekly summary</span><b>Improving</b></div>`:''}${Object.values(sh).every(v=>!v)?'<p class="muted">Nothing is shared right now.</p>':''}</section>`
:`<section class="card"><h3>Patient overview</h3><div class="kv"><span class="muted">Recovery score</span><b class="mono">${score()}/100</b></div><div class="kv"><span class="muted">Days clean</span><b class="mono">${S.days}</b></div><div class="kv"><span class="muted">Avg craving (7 days)</span><b class="mono">3.4/10</b></div><div class="kv"><span class="muted">Risk flag</span><b class="t-warn">Friday evening cravings</b></div></section>
<button class="btn ghost block" data-a="toast" data-v="PDF reports ship with the full app">${ic('download',18)} Download PDF report</button>
<section class="card"><h3>Set a goal for ${esc(S.user.name)}</h3><form data-form="goal" class="send"><input class="in" id="gn" placeholder="e.g. Attend two meetings this month" aria-label="New goal"><button class="btn" type="submit">${ic('plus',18)}</button></form></section>
<section class="card"><h3>Secure messages</h3><div class="chat">${S.clinMsgs.map(m=>`<div class="msg ${m.r==='c'?'u':'b'}">${esc(m.t)}</div>`).join('')}</div><form data-form="clin" class="send"><input class="in" id="clm" placeholder="Reply to the patient" aria-label="Reply" autocomplete="off"><button class="btn" type="submit" aria-label="Send">${ic('send',18)}</button></form></section>`}</div>`};

SCREEN.settings=()=>{const u=S.user,sh=S.share,sw=(k,l,d)=>`<div class="setrow"><div class="grow"><b>${l}</b>${d?`<p class="muted" style="font-size:12.5px">${d}</p>`:''}</div><label class="sw"><input type="checkbox" ${k.split('.').reduce((o,p)=>o[p],S)?'checked':''} data-bind="${k}" aria-label="${l}"><span></span></label></div>`;
 return `<div class="pg">${hdr('Settings','Privacy and control.',{back:'home'})}
<section class="card"><div class="row"><span class="avatar" style="width:52px;height:52px;font-size:22px">${esc((u.name||'A')[0].toUpperCase())}</span><div class="grow"><h3>${esc(u.name)}</h3><p class="muted">${esc(u.goal)} · ${u.subs.join(', ')||'No substances chosen'}</p></div></div><button class="btn soft sm" data-a="nav" data-r="setup">Edit profile</button></section>
<p class="sec">Preferences</p><section class="card">${sw('notif','Daily check-in reminder')}<div class="setrow"><b class="grow">Reminder time</b><input class="in" style="width:120px" type="time" data-bind="remind" value="${S.remind}" aria-label="Reminder time"></div>${sw('bio','Biometric lock','Protects the memory gallery and health data.')}<div class="setrow"><b class="grow">Appearance</b><div class="seg" style="width:190px"><button class="${S.theme==='light'?'on':''}" data-a="theme" data-v="light">Light</button><button class="${S.theme==='system'?'on':''}" data-a="theme" data-v="system">Auto</button><button class="${S.theme==='dark'?'on':''}" data-a="theme" data-v="dark">Dark</button></div></div></section>
<p class="sec">Guardian and clinician sharing</p><section class="card">${sw('share.sob','Days clean')}${sw('share.chk','Check-in completed')}${sw('share.mil','Milestones')}${sw('share.sos','SOS alerts')}${sw('share.wk','Weekly summary')}<button class="btn soft sm" data-a="nav" data-r="guardian">${ic('eye',16)} Preview guardian view</button></section>
<p class="sec">Privacy centre</p><section class="card"><ul class="tips"><li>${ic('lock',18)}Photos are processed on your device and never uploaded.</li><li>${ic('shield',18)}Messages are end-to-end encrypted.</li><li>${ic('heart',18)}No ads. No selling health data. Ever.</li></ul><div class="row2"><button class="btn ghost sm" data-a="toast" data-v="Your data export is prepared in the full app">${ic('download',16)} Export data</button><button class="btn danger sm" data-a="deleteAcc">${ic('trash',16)} Delete</button></div></section>
<p class="sec">More</p><section class="card"><button class="setrow" style="width:100%;text-align:left" data-a="nav" data-r="family"><span class="grow"><b>Family mode</b><p class="muted" style="font-size:12.5px">For people supporting someone in recovery.</p></span>${ic('chevron',18)}</button><button class="setrow" style="width:100%;text-align:left" data-a="logout"><b class="grow">Log out</b>${ic('chevron',18)}</button></section><p class="muted ctr mono" style="font-size:11px">Prototype 0.1 · sample data</p></div>`};

SCREEN.family=()=>`<div class="pg nofab">${hdr('Family mode','For people who love someone in recovery.',{back:'settings'})}
<section class="card"><h3>Understanding addiction</h3><p>Addiction changes how the brain handles reward and stress. It is a health condition, not a character flaw. Recovery usually takes time and often includes setbacks.</p></section>
<section class="card"><h3>Support without enabling</h3><div class="row2" style="align-items:start"><div><b class="t-good">Helpful</b><ul class="tips" style="margin-top:8px"><li>Listen first</li><li>Praise effort</li><li>Keep routines steady</li></ul></div><div><b class="t-bad">Avoid</b><ul class="tips" style="margin-top:8px"><li>Covering for use</li><li>Shaming or ultimatums</li><li>Handing over cash</li></ul></div></div></section>
<section class="card"><h3>A way to start the conversation</h3><blockquote class="quote" style="font-size:17px">“I’ve noticed things have been hard. I’m worried, and I’m not here to judge. What would help most right now?”</blockquote></section>
<section class="card"><h3>Look after yourself too</h3><p>Set one boundary you can keep. Keep one routine that is only yours. Find a family support group in your area.</p></section></div>`;

/* ---------- sheets ---------- */
function sosSheet(){S.sosCount=(S.sosCount||0)+1;openSheet(`<h2>You’re not alone. Breathe with this.</h2><p class="muted">Follow the circle for 60 seconds. Nothing else to do right now.</p><div class="bwrap sm"><div class="bcircle"></div><div class="bmid"><b class="bphase">Inhale</b><span class="bcount">4</span></div></div><p class="mono ctr btime">60s</p>
<div class="row2"><a class="btn ember" href="tel:${esc(S.user.ecNum.replace(/[^+\d]/g,''))}">${ic('phone',18)} Call ${esc(S.user.ecName||'contact')}</a><button class="btn ghost" data-a="copy" data-v="${esc(S.user.ecNum)}">${ic('copy',18)} Copy number</button></div><p class="num ctr">${esc(S.user.ecNum)}</p>
${HELP.map(h=>`<div class="hl"><div class="grow"><b>${h[1]}</b><span class="muted"> · ${h[0]}</span><br><span class="num">${h[2]}</span></div></div>`).join('')}
${S.share.sos?`<p class="muted" style="font-size:12.5px">Your guardian will be alerted that you used SOS.</p>`:''}<button class="btn soft block" data-a="closeSheet">I’m feeling steadier</button>`);startBreath(sheetEl,60)}
const PH=[['Inhale',4],['Hold',7],['Exhale',8]];
function startBreath(root,limit){stopBreath();const c=$('.bcircle',root),ph=$('.bphase',root),ct=$('.bcount',root),tm=$('.btime',root);if(!c)return;let p=0,left=4,el=0;
 const set=()=>{ph.textContent=PH[p][0];ct.textContent=left;c.style.transition=`transform ${p===1?.3:PH[p][1]}s ease-in-out`;c.style.transform=p===2?'scale(.72)':'scale(1.05)'};
 c.style.transform='scale(.72)';requestAnimationFrame(()=>requestAnimationFrame(set));
 B=setInterval(()=>{el++;left--;if(limit&&el>=limit){stopBreath();ph.textContent='Well done';ct.textContent='';c.style.transition='transform 1s';c.style.transform='scale(.9)';if(tm)tm.textContent='0s';return}
  if(left<=0){p=(p+1)%3;left=PH[p][1]}set();if(tm)tm.textContent=limit?Math.max(0,limit-el)+'s':Math.floor(el/60)+':'+pad(el%60)},1000)}

/* ---------- actions ---------- */
const setPath=(path,val)=>{const k=path.split('.');let o=S;for(let i=0;i<k.length-1;i++)o=o[k[i]];o[k[k.length-1]]=val};
function applyTheme(v){S.theme=v;try{if(v==='system')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',v)}catch(e){}$$('#themeSeg button').forEach(b=>b.classList.toggle('on',b.dataset.v===v))}
function fieldErr(id,m){const e=$('#e-'+id),i=$('#'+id);if(e)e.textContent=m||'';if(i)i.setAttribute('aria-invalid',m?'true':'false')}
function coachReply(t){const x=t.toLowerCase();
 if(/suicid|kill myself|end it|hopeless|can.?t go on|want to die/.test(x))return{t:'I’m really glad you told me. You deserve support right now. Please reach someone who can be with you: call your emergency contact or a helpline. I can open them for you.',act:['sos','Open SOS and helplines']};
 if(/craving|urge|want to use/.test(x))return{t:'Cravings usually peak and fade within 20 to 30 minutes. Try this now: sip cold water, do one round of 4-7-8 breathing, and message someone. Want me to start the breathing?',act:['sos','Start 60-second breathing']};
 if(/withdraw/.test(x))return{t:'Withdrawal depends on the substance. For alcohol and sedatives it can be dangerous to stop suddenly, so please speak to a doctor before cutting down. I can help you find a counselor.',act:['nav','Find a counselor','comm']};
 if(/medic|methadone|buprenorphine|naltrexone|mat\b/.test(x))return{t:'Medication-assisted treatment combines approved medicines with counselling and has good evidence for opioid and alcohol use. Only a clinician can decide what suits you. I can help you prepare questions for an appointment.'};
 if(/thank/.test(x))return{t:'Anytime. I’m here whenever you need me.'};
 return{t:'I’m here. Tell me a bit more about what’s happening right now. We can breathe, log a trigger, or message your buddy.'}}
function chatSend(t){t=t.trim();if(!t)return;S.chat.push({r:'u',t});S.chat.push({r:'b',typing:true});render(true);const c=$('.chat');if(c)c.scrollTop=c.scrollHeight;
 later(()=>{S.chat=S.chat.filter(m=>!m.typing);const r=coachReply(t);S.chat.push({r:'b',t:r.t,act:r.act});if(S.route==='hub'&&S.sub.hub==='coach')render(true);const c2=$('.chat');if(c2)c2.scrollTop=c2.scrollHeight},800)}
function buddySend(t){t=t.trim();if(!t)return;S.buddyMsgs.push({r:'u',t});render(true);const R=['That means a lot. Thank you.','Same here. One day at a time.','Yes! Let’s check in again on Sunday.','I’m glad you told me. I’m around tonight.'];later(()=>{S.buddyMsgs.push({r:'b',t:R[S.buddyMsgs.length%R.length]});if(S.route==='comm'&&S.sub.comm==='buddy')render(true);const c=$('#bchat');if(c)c.scrollTop=c.scrollHeight},1100);const c=$('#bchat');if(c)c.scrollTop=c.scrollHeight}
function arUpdate(){const d=$('#arDyn');if(d)d.innerHTML=arDyn();const l=$('#yrl');if(l)l.textContent=S.ar.years===0?'Today':'+'+S.ar.years+' years'}
function relapseSheet(){openSheet(`<h2>Thank you for being honest.</h2><p>A slip is part of many recovery stories. It doesn’t erase the ${S.days} days you built.</p><label class="fld"><span>One question: what was happening just before?</span><textarea class="in" id="rq" placeholder="Where were you, who were you with, how did you feel?"></textarea></label><div class="card flat"><b>One thing you can do right now</b><p class="muted">Take 60 seconds to breathe, then drink some water.</p><button class="btn soft sm" data-a="sos">${ic('wind',16)} Breathe now</button></div><p class="muted" style="font-size:12.5px">Your counter returns to day 0. Every day you’ve logged stays in your charts.</p><button class="btn block" data-a="relapseOK">Save and continue</button>`)}

const ACT={
 nav:t=>{if(t.dataset.s){const[g,v]=t.dataset.s.split(':');S.sub[g]=v}closeSheet();nav(t.dataset.r)},
 tab:t=>{const m={home:'home',scan:'scanIntro',track:'track',hub:'hub',comm:'comm'};nav(m[t.dataset.k])},
 sub:t=>{stopBreath();S.sub[t.dataset.g]=t.dataset.v;render(false)},
 theme:t=>{applyTheme(t.dataset.v);if(S.route==='settings')render(true)},
 reset:()=>{clearTimers();closeSheet();Object.assign(S,init());applyTheme('system');nav('splash')},
 removePhoto:()=>{S.scan.photo=null;if(S.screening){S.screening.photoTaken=false;S.screening.imageAnalysis=null;}toast('Photo removed.');render(false)},
 authMode:t=>{S.auth.mode=t.dataset.v;render(true)},
 pwShow:()=>{const i=$('#pw');i.type=i.type==='password'?'text':'password'},
 social:t=>{openSheet(`<h2>Signing in with ${t.dataset.v}…</h2><p class="muted">Prototype: no account is contacted.</p>`);later(()=>{closeSheet();S.loggedOnce=true;nav('home')},1100)},
 bio:()=>{openSheet(`<h2 class="ctr">Looking for your face…</h2><div class="vf" style="max-width:220px;margin:0 auto;width:100%"><i class="cb tl"></i><i class="cb tr"></i><i class="cb bl"></i><i class="cb br"></i><div class="beam"></div></div>`);later(()=>{closeSheet();nav('home')},1300)},
 forgot:()=>openSheet(`<h2>Reset your password</h2><p class="muted">Enter your email and we’ll send a 6-digit code.</p><form data-form="otp1" style="display:flex;flex-direction:column;gap:12px"><input class="in" id="fe" type="email" value="${esc(S.auth.email)}" aria-label="Email"><button class="btn" type="submit">Send code</button></form>`),
 chip:t=>{const a=S.user.subs,v=t.dataset.v,i=a.indexOf(v);if(i<0)a.push(v);else a.splice(i,1);render(true)},
 pick:t=>{S.user[t.dataset.k]=t.dataset.v;render(true)},
 counsel:t=>{S.user.counselor=t.dataset.v==='1';render(true)},
 stepNext:()=>{if(S.setup.step===0&&(+S.user.age<16||!S.user.age)){toast('You must be 16 or older to use Rehab Reality.');return}S.setup.step++;render(false)},
 stepBack:()=>{S.setup.step--;render(false)},
 finishSetup:()=>{S.ar.sub=subKey(S.user.subs[0]||'Alcohol');if(S.arEdu)S.arEdu.sub=S.ar.sub;S.badges.acct=!!(S.user.ecName&&S.user.ecNum);S.setup.step=0;toast('Profile saved.');nav('home')},
 /* 'sample' and file-input now route through consent to questionnaire */
 sample:()=>{S.scan.photo=window.SAMPLE_PORTRAIT||null;if(S.screening)S.screening.photoTaken=true;nav('consent')},
 /* 'goConsent' — skip photo, go directly to consent */
 goConsent:()=>{S.scan.photo=null;nav('consent')},
 plan:()=>{toast('Recovery plan started. Begin with today\'s check-in.');nav('track',{sub:Object.assign(S.sub,{track:'checkin'})})},
 arSub:t=>{S.ar.sub=t.dataset.v;render(true)},
 arPath:t=>{S.ar.path=t.dataset.v;render(true)},
 arShare:()=>openSheet(`<h2>Share with someone you trust?</h2><p>${esc(S.user.ecName||'Your contact')} would see only this projection image. Nothing else from the app.</p><div class="row2"><button class="btn ghost" data-a="closeSheet">Not now</button><button class="btn" data-a="shareGo">Share</button></div>`),
 shareGo:()=>{closeSheet();toast('Prototype: sharing is simulated.')},
 arChange:()=>{toast('Good call. Start with today’s check-in.');nav('track',{sub:Object.assign(S.sub,{track:'checkin'})})},
 mood:t=>{S.mood=t.dataset.v;render(true)},
 used:t=>{S.used=t.dataset.v;render(true)},
 sleep:t=>{S.sleep=clamp(S.sleep+parseFloat(t.dataset.v),0,14);render(true)},
 water:t=>{const n=+t.dataset.v;S.water=S.water===n?n-1:n;render(true)},
 submitCheckin:()=>{if(!S.mood||!S.used){toast('Pick a mood and answer “Did you use today?”');return}
  S.checkedToday=true;S.streak++;if(S.streak>=7)award('seven');
  if(S.used==='yes'){render(true);relapseSheet();return}
  toast(S.used==='partial'?'Logged. Thank you for being honest.':'Logged. +1 streak point.');render(false)},
 relapseOK:()=>{S.days=0;closeSheet();toast('Logged. Day 0 is still a day you showed up.');render(false)},
 unlock:t=>{t.textContent='Scanning…';later(()=>{S.gUnlocked=true;render(true)},900)},
 trig:()=>openSheet(`<h2>Log a trigger</h2><form data-form="trig" style="display:flex;flex-direction:column;gap:12px"><div class="chips">${['Place','Emotion','Person','Time'].map((c,i)=>`<label class="chip" style="cursor:pointer"><input class="vh" type="radio" name="tc" value="${c}" ${i===0?'checked':''}>${c}</label>`).join('')}</div><input class="in" id="tn" placeholder="What set it off?" aria-label="Trigger"><button class="btn" type="submit">Add to my trigger map</button></form>`),
 shareReport:()=>openSheet(`<h2>Share this report</h2><p>Choose who can see this week’s summary. You can revoke access in Settings.</p><button class="opt" data-a="shareGo"><i class="rd"></i>Dr. Meera Rao</button><button class="opt" data-a="shareGo"><i class="rd"></i>${esc(S.user.ecName||'Emergency contact')}</button>`),
 fav:()=>{const i=S.qi,k=S.favs.indexOf(i);if(k<0)S.favs.push(i);else S.favs.splice(k,1);render(true)},
 speak:t=>{try{speechSynthesis.cancel();speechSynthesis.speak(new SpeechSynthesisUtterance(t.dataset.v))}catch(e){toast('Audio is not available here')}},
 breath:t=>{if(B){stopBreath();t.textContent='Start';const p=$('.bphase');if(p)p.textContent='Ready'}else{startBreath($('#bw').parentNode);t.textContent='Stop'}},
 habit:t=>{const h=S.habits[+t.dataset.v];h.d=!h.d;render(true);if(h.d)toast('Habit done. Recovery Score is now '+score())},
 goal:t=>{const g=S.goals[+t.dataset.v];g.p=Math.min(g.m,g.p+1);render(true);if(g.p>=g.m)toast('Goal complete. Well done.')},
 sf:t=>{S.sf=t.dataset.v;render(true)},
 react:t=>{const i=t.dataset.i,k=t.dataset.v;S.react[i]=S.react[i]||{};S.react[i][k]=!S.react[i][k];render(true)},
 coachQ:t=>chatSend(t.dataset.v),
 ptag:t=>{S.postTag=t.dataset.v;const ta=$('#pt'),v=ta?ta.value:'';render(true);const n=$('#pt');if(n)n.value=v},
 support:t=>{const p=S.feed.find(x=>x.id===+t.dataset.v);if(!p.mine){p.mine=true;S.posts++;if(S.posts>=5)award('comm')}else{p.mine=false;S.posts--}render(true)},
 optBuddy:()=>{S.pairing=true;render(true);later(()=>{S.buddy=true;S.pairing=false;if(S.route==='comm')render(true)},1500)},
 buddyQ:t=>buddySend(t.dataset.v),
 copy:t=>{const v=t.dataset.v;try{navigator.clipboard.writeText(v).then(()=>toast('Copied '+v)).catch(()=>toast(v))}catch(e){toast(v)}},
 crisisChat:()=>{openSheet(`<h2>Connecting you…</h2><p class="muted">In the full app this opens a chat with a trained peer counselor from a partner NGO. Prototype only.</p><button class="btn soft block" data-a="closeSheet">Okay</button>`)},
 book:t=>{const c=['Dr. Meera Rao','Kabir Nair, LMHC','Sana Thomas'][+t.dataset.v];openSheet(`<h2>Book ${c}</h2><p class="muted">Pick a time. Your recovery report is shared only if you choose.</p><div class="chips">${['Today 6:30 pm','Tomorrow 11:00 am','Sat 10:00 am'].map((s,i)=>`<button class="chip ${i===0?'on':''}" data-a="slot">${s}</button>`).join('')}</div><button class="btn block" data-a="bookGo">Request appointment</button>`)},
 slot:t=>{$$('.sheet .chip').forEach(c=>c.classList.remove('on'));t.classList.add('on')},
 bookGo:()=>{closeSheet();toast('Prototype: request created, not sent.')},
 sos:()=>{closeSheet();sosSheet()},
 closeSheet:()=>closeSheet(),
 notif:()=>openSheet(`<h2>Notifications</h2>${[['Check-in reminder','Tonight at '+S.remind],['RecoveryRobin_2947 supported your post','2 hours ago'],['You’re 26 days from your 60-day milestone','Today']].map(n=>`<div class="hl"><span class="t-ember">${ic('bell',20)}</span><div class="grow"><b>${n[0]}</b><p class="muted">${n[1]}</p></div></div>`).join('')}`),
 guardTab:t=>{S.guard=t.dataset.v;render(true)},
 deleteAcc:()=>openSheet(`<h2>Delete your account?</h2><p>This permanently removes your profile, check-ins and gallery from this device and our servers. This cannot be undone.</p><div class="row2"><button class="btn ghost" data-a="closeSheet">Keep my account</button><button class="btn danger" data-a="deleteGo">Delete</button></div>`),
 deleteGo:()=>{closeSheet();ACT.reset()},
 logout:()=>{S.loggedOnce=true;nav('login')},
 toast:t=>toast(t.dataset.v)
};
const FORMS={
 auth:()=>{const a=S.auth;let ok=true;if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(a.email.trim())){fieldErr('email','Enter a valid email, like name@example.com.');ok=false}else fieldErr('email','');
  if(a.pw.length<8){fieldErr('pw','Use at least 8 characters.');ok=false}else fieldErr('pw','');if(!ok)return;S.loggedOnce=true;nav(a.mode==='up'?'setup':'home')},
 otp1:()=>{sheetEl.innerHTML=`<div class="grab"></div><h2>Enter your code</h2><p class="muted">Prototype: any 6 digits work.</p><form data-form="otp2" style="display:flex;flex-direction:column;gap:12px"><input class="in mono" id="otp" inputmode="numeric" maxlength="6" placeholder="000000" style="letter-spacing:.5em;text-align:center;font-size:22px" aria-label="6-digit code"><span class="err" id="e-otp"></span><button class="btn" type="submit">Verify</button></form>`},
 otp2:()=>{const v=$('#otp').value;if(!/^\d{6}$/.test(v)){fieldErr('otp','Enter the 6 digits from your email.');return}closeSheet();toast('Password reset. You can log in now.')},
 chat:f=>{const i=$('#cin');const v=i.value;i.value='';chatSend(v)},
 buddy:()=>{const i=$('#bin');const v=i.value;i.value='';buddySend(v)},
 post:()=>{const ta=$('#pt'),v=ta.value.trim();if(!v){toast('Write something first.');return}S.feed.unshift({id:Date.now(),u:S.anon,tag:S.postTag,t:'now',txt:v,sup:0,rep:0,mine:false});S.posts++;if(S.posts>=5)award('comm');toast('Posted anonymously.');render(true)},
 habit:()=>{const i=$('#hn'),v=i.value.trim();if(!v)return;S.habits.push({n:v,d:false,s:0});render(true)},
 goal:()=>{const i=$('#gn'),v=i.value.trim();if(!v)return;S.goals.unshift({t:'1 month',n:v,p:0,m:2,by:'Dr. Rao'});toast('Goal added to '+S.user.name+'’s plan.');i.value=''},
 clin:()=>{const i=$('#clm'),v=i.value.trim();if(!v)return;S.clinMsgs.push({r:'c',t:v});render(true)},
 trig:f=>{const c=($('input[name=tc]:checked')||{}).value||'Place',v=$('#tn').value.trim();if(!v)return;S.triggers.unshift([c,v,1]);closeSheet();toast('Added to your trigger map.');render(true)}
};
const INPUT={
 age:t=>{const v=+t.value,m=$('#ageMsg');if(!m)return;m.textContent=t.value&&v<16?'Rehab Reality is for ages 16 and over. If you need help now, call a helpline.':v&&v<18?'Under 18: a parent or guardian consent step follows.':''; m.style.color=v&&v<16?'var(--bad)':'var(--muted)'},
 sev:t=>{S.scan.sev=+t.value;t.style.setProperty('--p',t.value+'%');const n=$('#needle');if(n)n.style.transform=`rotate(${-90+S.scan.sev*1.8}deg)`;const d=$('#resDyn');if(d)d.innerHTML=resDyn()},
 craving:t=>{S.craving=+t.value;t.style.setProperty('--p',t.value*10+'%');$('#cv').textContent=t.value;$('#cvl').textContent=cravLabel(+t.value)},
 years:t=>{S.ar.years=+t.value;t.style.setProperty('--p',t.value*5+'%');arUpdate()},
 postText:t=>{const x=t.value.toLowerCase(),b=$('#crisisBox');if(!b)return;b.innerHTML=/suicid|kill myself|end it|can.?t go on|want to die|hopeless/.test(x)?`<div class="crisis"><b>We’re here with you</b><p>It sounds like things feel very heavy. Please reach someone now. You can still post, and a moderator will check in.</p><button type="button" class="btn ember sm" data-a="sos">Get support now</button></div>`:''}
};
const CHANGE={arSplit:t=>{S.ar.split=t.checked;arUpdate()},exercise:t=>{S.exercise=t.checked}};

/* ---------- events ---------- */
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t)return;const f=ACT[t.dataset.a];if(f){if(t.tagName==='A')return f(t);f(t)}});
document.addEventListener('submit',e=>{e.preventDefault();const k=e.target.dataset.form;if(k&&FORMS[k])FORMS[k](e.target)});
document.addEventListener('input',e=>{const t=e.target;if(t.dataset&&t.dataset.bind&&t.type!=='checkbox')setPath(t.dataset.bind,t.value);if(t.dataset&&t.dataset.i&&INPUT[t.dataset.i])INPUT[t.dataset.i](t)});
document.addEventListener('change',e=>{const t=e.target;if(t.dataset&&t.dataset.bind&&t.type==='checkbox'){setPath(t.dataset.bind,t.checked);if(S.route==='guardian')render(true)}
 if(t.dataset&&t.dataset.c&&CHANGE[t.dataset.c])CHANGE[t.dataset.c](t);
 if(t.matches&&t.matches('input[type=file][data-file]')&&t.files&&t.files[0]){try{S.scan.photo=URL.createObjectURL(t.files[0]);if(S.screening)S.screening.photoTaken=true;}catch(err){S.scan.photo=null}
   if(S.route==='scanIntro'){render(false);}else{nav('consent');}}});
let drag=null;
function movePos(e){const r=drag.getBoundingClientRect(),p=clamp((e.clientX-r.left)/r.width*100,4,96);drag.style.setProperty('--pos',p+'%');if(drag.dataset.store==='ar')S.ar.pos=p}
document.addEventListener('pointerdown',e=>{const c=e.target.closest&&e.target.closest('.cmp:not(.one)');if(!c)return;drag=c;try{c.setPointerCapture(e.pointerId)}catch(err){}movePos(e)});
document.addEventListener('pointermove',e=>{if(drag)movePos(e)});
['pointerup','pointercancel'].forEach(n=>document.addEventListener(n,()=>{drag=null}));
const tick=()=>{const c=$('#clock');if(c)c.textContent=new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})};tick();setInterval(tick,30000);
$('#rlogo').innerHTML=logo(46);applyTheme('system');nav('splash');
/* Expose globals for feature scripts */
window.S=S;window.SCREEN=SCREEN;window.AFTER=AFTER;window.ACT=ACT;
window.CHANGE=CHANGE;window.INPUT=INPUT;
window.nav=nav;window.render=render;window.toast=toast;
window.openSheet=openSheet;window.closeSheet=closeSheet;
window.ic=ic;window.hdr=hdr;window.esc=esc;
window.faceSVG=faceSVG;window.facePhoto=facePhoto;window.face=face;
window.MESH=MESH;window.PROF=PROF;window.Dof=Dof;
window.clamp=clamp;window.mix=mix;
window._appReady=true;
})();
