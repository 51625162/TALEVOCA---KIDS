/* ===================================================================
   TALEVOCA Kids — app.js
   Tamamen istemci tarafında çalışır (localStorage). Dış bağlantı yok.
=================================================================== */

const USERS = ["TALHA","ZEYNEP"];
const AVATARS = { TALHA:"🦖", ZEYNEP:"🦄" };
const ALL_WORDS = LESSONS.flatMap(l => l.w);
const CHEST_STEP = 10; // her 10 derste bir sandık envantere eklenir

const SENTENCES = [
  { tr: "Ben mutluyum.", words: ["I","am","happy"] },
  { tr: "O bir köpek.", words: ["It","is","a","dog"] },
  { tr: "Biz okula gidiyoruz.", words: ["We","go","to","school"] },
  { tr: "Kedi masanın üzerinde.", words: ["The","cat","is","on","the","table"] },
  { tr: "O elma yiyor.", words: ["She","eats","an","apple"] },
  { tr: "Güneş parlıyor.", words: ["The","sun","is","shining"] },
  { tr: "Ben bir kitap okuyorum.", words: ["I","am","reading","a","book"] },
  { tr: "Onun adı Mia.", words: ["Her","name","is","Mia"] },
  { tr: "Biz futbol oynuyoruz.", words: ["We","play","football"] },
  { tr: "Köpek çok hızlı koşuyor.", words: ["The","dog","runs","very","fast"] },
  { tr: "Annem bir doktor.", words: ["My","mother","is","a","doctor"] },
  { tr: "Bu benim en sevdiğim renk.", words: ["This","is","my","favorite","color"] },
  { tr: "Onlar parkta oynuyorlar.", words: ["They","are","playing","in","the","park"] },
  { tr: "Ben her sabah süt içerim.", words: ["I","drink","milk","every","morning"] },
  { tr: "Kuş gökyüzünde uçuyor.", words: ["The","bird","flies","in","the","sky"] },
];

let CUR = { user:null, state:null };
let PARENT_CHILD = null;
let PENDING_LOGIN_USER = null;

/* ===================================================================
   SES MOTORU (Web Audio API) — tamamen çevrimdışı, dosya indirmeden
   üretilen ses efektleri. Doğru/yanlış/alkış/havai fişek/sandık sesleri.
=================================================================== */
let AUDIO_CTX = null;
function getAudioCtx(){
  if(!AUDIO_CTX){
    try{ AUDIO_CTX = new (window.AudioContext || window.webkitAudioContext)(); }catch(e){ return null; }
  }
  if(AUDIO_CTX.state === "suspended") AUDIO_CTX.resume();
  return AUDIO_CTX;
}
function playTone(freq, duration, type, startDelay, gainVal){
  const ctx = getAudioCtx();
  if(!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type || "sine";
  osc.frequency.value = freq;
  const t0 = ctx.currentTime + (startDelay||0);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(gainVal||0.2, t0+0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0+duration);
  osc.connect(gain); gain.connect(ctx.destination);
  osc.start(t0); osc.stop(t0+duration+0.02);
}
function playNoiseBurst(duration, startDelay, gainVal){
  const ctx = getAudioCtx();
  if(!ctx) return;
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for(let i=0;i<bufferSize;i++) data[i] = (Math.random()*2-1) * (1 - i/bufferSize);
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const gain = ctx.createGain();
  const t0 = ctx.currentTime + (startDelay||0);
  gain.gain.setValueAtTime(gainVal||0.15, t0);
  src.connect(gain); gain.connect(ctx.destination);
  src.start(t0);
}
function playCorrectSound(){
  playTone(523.25, 0.12, "sine", 0, 0.22);
  playTone(783.99, 0.18, "sine", 0.1, 0.22);
}
function playWrongSound(){
  playTone(220, 0.25, "sawtooth", 0, 0.15);
  playTone(180, 0.3, "sawtooth", 0.1, 0.12);
}
function playApplauseSound(){
  for(let i=0;i<8;i++) playNoiseBurst(0.15, i*0.09, 0.12);
}
function playFireworksSound(){
  playNoiseBurst(0.4, 0, 0.2);
  playTone(880, 0.3, "square", 0.05, 0.12);
  playNoiseBurst(0.35, 0.5, 0.18);
  playTone(1046, 0.3, "square", 0.55, 0.12);
  playNoiseBurst(0.3, 1.0, 0.16);
}
function playChestSound(){
  playTone(392, 0.15, "triangle", 0, 0.15);
  playTone(523.25, 0.2, "triangle", 0.15, 0.18);
  playTone(659.25, 0.3, "triangle", 0.32, 0.2);
}

/* --------------- SESLENDİRME (TTS) --------------- */
// Cihazda yüklü olan sesleri toplar. Tarayıcı/cihaza göre İngilizce ses
// sayısı değişebilir — bazı cihazlarda tek ses, bazılarında çok sayıda olur.
let AVAILABLE_VOICES = [];
let VOICES_READY = false;
// Bazı cihazlarda garip/bozuk "novelty" sesler bulunur (ör. Zarvox, Bahh,
// Trinoids, Bad News...). Bunlar çocuklar için uygun olmadığından listeden
// çıkarılır; en fazla 5 düzgün İngilizce ses gösterilir.
const BROKEN_VOICE_NAMES = ["zarvox","bahh","bad news","bells","boing","bubbles","cellos","wobble","trinoids","albert","deranged","hysterical","pipe organ","junior","kathy","ralph","fred","whisper","good news"];
function loadVoices(){
  try{
    const all = speechSynthesis.getVoices();
    if(all && all.length){
      let en = all.filter(v=> v.lang && v.lang.toLowerCase().startsWith("en"));
      if(!en.length) en = all;
      en = en.filter(v=> !BROKEN_VOICE_NAMES.some(bad=> v.name.toLowerCase().includes(bad)));
      if(!en.length) en = all.filter(v=> v.lang && v.lang.toLowerCase().startsWith("en"));
      AVAILABLE_VOICES = en.slice(0, 5);
      VOICES_READY = true;
    }
  }catch(e){ /* speechSynthesis yok */ }
}
try{
  loadVoices();
  if(typeof speechSynthesis !== "undefined") speechSynthesis.onvoiceschanged = loadVoices;
}catch(e){ /* yok say */ }

function getPreferredVoice(){
  if(!AVAILABLE_VOICES.length) return null;
  const pref = CUR.state && CUR.state.voicePref;
  if(pref){
    const found = AVAILABLE_VOICES.find(v=> v.name===pref);
    if(found) return found;
  }
  return AVAILABLE_VOICES[0];
}
// speakerKey: dialoglarda karakterleri birbirinden ayırmak için ("A" veya "B").
// Farklı sesler varsa farklı ses, yoksa perde (pitch) farkıyla ayırt edilir.
function speakText(text, lang, speakerKey){
  try{
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang || "en-US";
    u.rate = lang === "tr-TR" ? 0.95 : 0.85;
    u.pitch = 1;
    if(lang !== "tr-TR"){
      let voice = getPreferredVoice();
      if(speakerKey && AVAILABLE_VOICES.length > 1){
        // Karakter A ve B için mümkünse farklı iki ses seç.
        const idx = speakerKey === "B" ? 1 % AVAILABLE_VOICES.length : 0;
        voice = AVAILABLE_VOICES[idx];
      } else if(speakerKey === "B"){
        u.pitch = 0.8; u.rate = 0.8; // tek ses varsa kalın/yavaş perde ile ayırt et
      } else if(speakerKey === "A"){
        u.pitch = 1.15; u.rate = 0.88;
      }
      if(voice) u.voice = voice;
    }
    speechSynthesis.speak(u);
  }catch(e){ /* speechSynthesis desteklenmiyorsa sessizce geç */ }
}
function speakEnglish(text, speakerKey){ speakText(text, "en-US", speakerKey); }
function speakTurkish(text){ speakText(text, "tr-TR"); }

/* --------------- SES AYARLARI PANELİ --------------- */
function openVoiceSettings(){
  loadVoices();
  const el = document.getElementById("voice-settings-content");
  if(!AVAILABLE_VOICES.length){
    el.innerHTML = `<h3>🔊 Ses Ayarları</h3><p style="color:var(--text-soft)">Cihazında birden fazla İngilizce ses bulunamadı. Yine de karakterler arasında perde farkıyla ayrım yapılır.</p>
      <button class="big-btn" id="voice-close-btn">Kapat</button>`;
    document.getElementById("voice-close-btn").addEventListener("click", ()=> closeModal("modal-voice-settings"));
    openModal("modal-voice-settings");
    return;
  }
  const currentPref = (CUR.state && CUR.state.voicePref) || (AVAILABLE_VOICES[0] && AVAILABLE_VOICES[0].name);
  el.innerHTML = `<h3>🔊 Ses Ayarları</h3>
    <p style="color:var(--text-soft);font-size:13px">Derslerde ve hikâyelerde kullanılacak sesi seç (en fazla 5 seçenek gösterilir).</p>
    <div id="voice-list"></div>
    <button class="big-btn" id="voice-close-btn" style="margin-top:12px">Kapat</button>`;
  const list = document.getElementById("voice-list");
  AVAILABLE_VOICES.forEach((v, idx)=>{
    const row = document.createElement("div");
    row.className = "voice-row" + (v.name===currentPref ? " selected" : "");
    row.innerHTML = `<span>🎙️ Ses ${idx+1} <span style="color:var(--text-soft);font-size:11px">(${v.name})</span></span>`;
    const btnTest = document.createElement("button");
    btnTest.className = "big-btn secondary";
    btnTest.style.cssText = "width:auto;padding:8px 14px;margin:0 6px";
    btnTest.textContent = "▶️ Dene";
    btnTest.addEventListener("click", (e)=>{ e.stopPropagation(); const u = new SpeechSynthesisUtterance("Hello! This is my voice."); u.voice = v; u.lang="en-US"; speechSynthesis.cancel(); speechSynthesis.speak(u); });
    const btnSelect = document.createElement("button");
    btnSelect.className = "big-btn";
    btnSelect.style.cssText = "width:auto;padding:8px 14px";
    btnSelect.textContent = v.name===currentPref ? "✓ Seçili" : "Seç";
    btnSelect.addEventListener("click", ()=>{
      CUR.state.voicePref = v.name;
      saveState();
      openVoiceSettings();
    });
    row.appendChild(btnTest);
    row.appendChild(btnSelect);
    list.appendChild(row);
  });
  document.getElementById("voice-close-btn").addEventListener("click", ()=> closeModal("modal-voice-settings"));
  openModal("modal-voice-settings");
}

/* ---------------- STORAGE ---------------- */
function defaultState(){
  return {
    xp:0, diamonds:0,
    lessonsDone:[], lessonScores:{},
    storiesDone:[], chessDone:[],
    gamesDone:0,
    mistakes:{},
    activityLog:[],
    costume:0, frame:0, pet:null,
    openedChests:[],
    chestInventory:[],
    voicePref:null,
    lumiWins:0,
    badgesUnlocked:[]
  };
}
function loadState(user){
  try{
    const raw = localStorage.getItem("talevoca_"+user);
    if(!raw) return defaultState();
    return Object.assign(defaultState(), JSON.parse(raw));
  }catch(e){ return defaultState(); }
}
function saveState(){
  if(!CUR.user) return;
  localStorage.setItem("talevoca_"+CUR.user, JSON.stringify(CUR.state));
}

/* ---------------- INIT / LOGIN (şifreli, hesaplar tamamen ayrı) ---------------- */
function init(){
  document.querySelectorAll("#user-pick-step .user-btn[data-user]").forEach(b=>{
    b.addEventListener("click", ()=> showPasswordStep(b.dataset.user));
  });
  document.getElementById("btn-password-back").addEventListener("click", showUserPickStep);
  document.getElementById("btn-password-submit").addEventListener("click", submitPassword);
  document.getElementById("password-input").addEventListener("keydown", (e)=>{
    if(e.key === "Enter") submitPassword();
  });
  document.getElementById("btn-logout").addEventListener("click", logout);
  document.getElementById("btn-parent-login").addEventListener("click", ()=>{
    document.getElementById("screen-login").classList.remove("active");
    document.getElementById("screen-parent").classList.remove("hidden");
    renderParentPicker();
  });
  document.getElementById("btn-parent-back").addEventListener("click", ()=>{
    document.getElementById("screen-parent").classList.add("hidden");
    document.getElementById("screen-login").classList.add("active");
    showUserPickStep();
  });
  document.querySelectorAll(".user-btn[data-pchild]").forEach(b=>{
    b.addEventListener("click", ()=>{ PARENT_CHILD = b.dataset.pchild; renderParentReport(); });
  });
  document.querySelectorAll(".tab-btn").forEach(b=>{
    b.addEventListener("click", ()=> switchTab(b.dataset.tab));
  });
  document.querySelectorAll(".modal-close").forEach(b=>{
    b.addEventListener("click", ()=> closeModal(b.dataset.close));
  });
  document.querySelectorAll(".game-card").forEach(b=>{
    b.addEventListener("click", ()=> openGame(b.dataset.game));
  });
  document.getElementById("btn-chess-howto").addEventListener("click", openChessHowTo);
  document.getElementById("btn-chess-vs-lumi").addEventListener("click", openChessMatchPicker);
  document.getElementById("btn-voice-settings").addEventListener("click", openVoiceSettings);

  // Not: Güvenlik/gizlilik için oturum otomatik açılmaz — her girişte şifre istenir.
  // Bu sayede TALHA ve ZEYNEP birbirinin ilerlemesini göremez.
}

function showPasswordStep(user){
  PENDING_LOGIN_USER = user;
  document.getElementById("user-pick-step").classList.add("hidden");
  document.getElementById("password-step").classList.remove("hidden");
  document.getElementById("password-avatar").textContent = AVATARS[user];
  document.getElementById("password-username").textContent = user;
  document.getElementById("password-input").value = "";
  document.getElementById("password-error").classList.add("hidden");
  document.getElementById("password-input").focus();
}
function showUserPickStep(){
  PENDING_LOGIN_USER = null;
  document.getElementById("password-step").classList.add("hidden");
  document.getElementById("user-pick-step").classList.remove("hidden");
}
function submitPassword(){
  const entered = document.getElementById("password-input").value.trim();
  const user = PENDING_LOGIN_USER;
  if(!user) return;
  if(entered === USER_CREDENTIALS[user]){
    login(user);
  } else {
    document.getElementById("password-error").classList.remove("hidden");
    playWrongSound();
  }
}

function login(user){
  CUR.user = user;
  CUR.state = loadState(user);
  localStorage.setItem("talevoca_current_user", user);
  document.getElementById("screen-login").classList.remove("active");
  document.getElementById("screen-parent").classList.add("hidden");
  document.getElementById("app-shell").classList.remove("hidden");
  document.getElementById("cur-avatar").textContent = AVATARS[user];
  document.getElementById("cur-user-name").textContent = user;
  showUserPickStep();
  renderAll();
}
function logout(){
  CUR = { user:null, state:null };
  localStorage.removeItem("talevoca_current_user");
  document.getElementById("app-shell").classList.add("hidden");
  document.getElementById("screen-login").classList.add("active");
  showUserPickStep();
}

function switchTab(tab){
  document.querySelectorAll(".tab-btn").forEach(b=> b.classList.toggle("active", b.dataset.tab===tab));
  document.querySelectorAll(".tab-view").forEach(v=> v.classList.toggle("active", v.id==="tab-"+tab));
}

function renderAll(){
  renderHeader();
  renderHome();
  renderStories();
  renderChessList();
  renderRewards();
}
function renderHeader(){
  document.getElementById("stat-xp").textContent = CUR.state.xp;
  document.getElementById("stat-diamonds").textContent = CUR.state.diamonds;
  document.getElementById("stat-level").textContent = levelFromXP(CUR.state.xp);
}

/* ---------------- REWARD / BADGE HELPERS ---------------- */
function addXP(amount){ CUR.state.xp += amount; }
function addDiamonds(amount){ CUR.state.diamonds += amount; }
function logActivity(type, ref){
  CUR.state.activityLog.push({ type, ref, ts: Date.now() });
}
function checkNewBadges(){
  const newly = [];
  BADGES.forEach(b=>{
    if(!CUR.state.badgesUnlocked.includes(b.id) && b.cond(CUR.state)){
      CUR.state.badgesUnlocked.push(b.id);
      newly.push(b);
    }
  });
  return newly;
}
function finishAndReward(xp, diamonds, extraNote){
  addXP(xp); addDiamonds(diamonds);
  const newBadges = checkNewBadges();
  saveState();
  renderHeader(); renderRewards();
  showRewardPopup(xp, diamonds, extraNote, newBadges);
}
function showRewardPopup(xp, diamonds, note, newBadges){
  const el = document.getElementById("reward-content");
  let badgeHtml = "";
  if(newBadges && newBadges.length){
    badgeHtml = "<div style='margin-top:10px'>" + newBadges.map(b=>
      `<div class="mistake-tag" style="background:rgba(255,184,77,.18);color:#FFB84D">🏅 ${b.name}</div>`
    ).join("") + "</div>";
  }
  el.innerHTML = `
    <div style="font-size:44px">🎉</div>
    <h2>Harika iş!</h2>
    <p>${note || ""}</p>
    <p style="font-size:18px">⭐ +${xp} XP &nbsp; 💎 +${diamonds}</p>
    ${badgeHtml}
    <button class="big-btn" onclick="closeModal('modal-reward')">Devam Et</button>
  `;
  openModal("modal-reward");
}

/* ---------------- MODAL HELPERS ---------------- */
function openModal(id){ document.getElementById(id).classList.remove("hidden"); }
function closeModal(id){ document.getElementById(id).classList.add("hidden"); }

/* ================= HOME / LESSONS ================= */
function renderHome(){
  const wrap = document.getElementById("lesson-path");
  wrap.innerHTML = "";
  LESSONS.forEach((lesson, idx)=>{
    const done = CUR.state.lessonsDone.includes(idx);
    const unlocked = idx===0 || CUR.state.lessonsDone.includes(idx-1);
    const node = document.createElement("div");
    node.className = "lesson-node " + (done?"done":(unlocked?"current":"locked"));
    node.innerHTML = `${idx+1}<span class="ln-title">${lesson.t}</span>`;
    if(unlocked || done) node.addEventListener("click", ()=> openLesson(idx));
    wrap.appendChild(node);
  });
}

function shuffle(arr){ const a=[...arr]; for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

function buildLessonQuestions(idx){
  const lesson = LESSONS[idx];
  return lesson.w.map(pair=>{
    const dir = Math.random()<0.5 ? "entr" : "tren";
    const correct = dir==="entr" ? pair[1] : pair[0];
    const promptWord = dir==="entr" ? pair[0] : pair[1];
    const pool = ALL_WORDS.filter(p => (dir==="entr" ? p[1] : p[0]) !== correct);
    const shuffledPool = shuffle(pool);
    const seen = new Set([correct]);
    const distractors = [];
    for(const p of shuffledPool){
      const val = dir==="entr" ? p[1] : p[0];
      if(!seen.has(val)){ seen.add(val); distractors.push(val); }
      if(distractors.length===3) break;
    }
    const options = shuffle([correct, ...distractors]);
    return { pair, dir, promptWord, correct, options, answerIndex: options.indexOf(correct) };
  });
}

let LESSON_RUN = null;
function openLesson(idx){
  LESSON_RUN = { idx, questions: buildLessonQuestions(idx), qi:0, correctCount:0 };
  renderLessonQuestion();
  openModal("modal-lesson");
}
function renderLessonQuestion(){
  const run = LESSON_RUN;
  const q = run.questions[run.qi];
  const pct = Math.round((run.qi/run.questions.length)*100);
  const el = document.getElementById("lesson-content");
  el.innerHTML = `
    <h3>${LESSONS[run.idx].t}</h3>
    <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
    <div class="q-word" id="q-word-el" style="cursor:pointer" title="Dinlemek için tıkla">${q.promptWord} 🔊</div>
    <div class="opt-grid" id="opt-grid"></div>
  `;
  // Her kelimenin telaffuzu otomatik seslendirilir (İngilizce kelime esas alınır)
  speakEnglish(q.pair[0]);
  document.getElementById("q-word-el").addEventListener("click", ()=> speakEnglish(q.pair[0]));
  const grid = document.getElementById("opt-grid");
  q.options.forEach((opt,i)=>{
    const btn = document.createElement("button");
    btn.className = "opt-btn";
    btn.textContent = opt;
    btn.addEventListener("click", ()=> answerLesson(i));
    grid.appendChild(btn);
  });
}
function answerLesson(i){
  const run = LESSON_RUN;
  const q = run.questions[run.qi];
  const buttons = document.querySelectorAll("#opt-grid .opt-btn");
  buttons.forEach((b,bi)=>{
    b.disabled = true;
    if(bi===q.answerIndex) b.classList.add("correct");
    else if(bi===i) b.classList.add("wrong");
  });
  const isCorrect = i===q.answerIndex;
  if(isCorrect){ run.correctCount++; playCorrectSound(); }
  else{
    playWrongSound();
    const key = q.pair[0]+"|"+q.pair[1];
    CUR.state.mistakes[key] = (CUR.state.mistakes[key]||0)+1;
  }
  setTimeout(()=>{
    run.qi++;
    if(run.qi < run.questions.length) renderLessonQuestion();
    else finishLesson();
  }, 800);
}
function finishLesson(){
  const run = LESSON_RUN;
  const total = run.questions.length;
  const firstTry = !CUR.state.lessonsDone.includes(run.idx);
  if(firstTry) CUR.state.lessonsDone.push(run.idx);
  CUR.state.lessonScores[run.idx] = { correct: run.correctCount, total };
  logActivity("lesson", run.idx);
  const xp = 10 + run.correctCount*2;
  const diamonds = run.correctCount;
  let chestNote = "";
  if(firstTry && CUR.state.lessonsDone.length % CHEST_STEP === 0){
    const chestId = "chest_" + CUR.state.lessonsDone.length;
    CUR.state.chestInventory.push({ id: chestId, opened:false });
    chestNote = " 📦 Envantere yeni bir sandık eklendi!";
  }
  closeModal("modal-lesson");
  renderHome();
  playFireworksSound();
  setTimeout(()=> speakTurkish("Tebrikler!"), 300);
  finishAndReward(xp, diamonds, `${LESSONS[run.idx].t} tamamlandı: ${run.correctCount}/${total} doğru.${chestNote}`);
}

/* ================= STORIES ================= */
function renderStories(){
  const wrap = document.getElementById("story-list");
  wrap.innerHTML = "";
  STORIES.forEach(story=>{
    const done = CUR.state.storiesDone.includes(story.id);
    const card = document.createElement("div");
    card.className = "story-card";
    card.innerHTML = `<div class="s-icon">📖</div><div>${story.title}</div>${done?'<div class="card-done-tag">Tamamlandı</div>':''}`;
    card.addEventListener("click", ()=> openStory(story.id));
    wrap.appendChild(card);
  });
  DIALOGUE_STORIES.forEach(story=>{
    const done = CUR.state.storiesDone.includes(story.id);
    const card = document.createElement("div");
    card.className = "story-card";
    card.innerHTML = `<div class="s-icon">💬</div><div>${story.title}</div><div style="font-size:11px;color:var(--text-soft)">Diyalog Hikâyesi</div>${done?'<div class="card-done-tag">Tamamlandı</div>':''}`;
    card.addEventListener("click", ()=> openDialogueStory(story.id));
    wrap.appendChild(card);
  });
}
let STORY_RUN = null;
function openStory(id){
  const story = STORIES.find(s=>s.id===id);
  STORY_RUN = { story, nodeKey:"start" };
  renderStoryNode(true);
  openModal("modal-story");
}
// Sözlükteki kelimeleri tıklanabilir hale getirir; tıklayınca Türkçesi görünür.
function renderGlossText(text, gloss){
  if(!gloss) return text;
  let html = text;
  const words = Object.keys(gloss).sort((a,b)=>b.length-a.length);
  words.forEach(w=>{
    const re = new RegExp(`\\b(${w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})\\b`, "i");
    html = html.replace(re, `<span class="gloss-word" data-tr="${gloss[w]}">$1</span>`);
  });
  return html;
}
function attachGlossHandlers(container){
  container.querySelectorAll(".gloss-word").forEach(span=>{
    span.addEventListener("click", (e)=>{
      e.stopPropagation();
      const existing = span.querySelector(".gloss-tooltip");
      if(existing){ existing.remove(); return; }
      container.querySelectorAll(".gloss-tooltip").forEach(t=>t.remove());
      const tip = document.createElement("span");
      tip.className = "gloss-tooltip";
      tip.textContent = span.dataset.tr;
      span.appendChild(tip);
    });
  });
}
function renderStoryNode(isIntro){
  const { story, nodeKey } = STORY_RUN;
  const el = document.getElementById("story-content");
  if(isIntro){
    const introHtml = renderGlossText(story.intro, story.gloss);
    el.innerHTML = `<h3>${story.title}</h3><p id="story-text">${introHtml}</p>
      <button class="big-btn secondary" id="story-narrate">🔊 Hikâyeyi Dinle</button>
      <button class="big-btn" id="story-start">Başla</button>`;
    attachGlossHandlers(el);
    document.getElementById("story-narrate").addEventListener("click", ()=> speakEnglish(story.intro));
    document.getElementById("story-start").addEventListener("click", ()=>{ renderStoryNode(false); });
    speakEnglish(story.intro);
    return;
  }
  const node = story.nodes[nodeKey];
  if(node.end){
    const textHtml = renderGlossText(node.text, story.gloss);
    el.innerHTML = `<h3>${story.title}</h3><p id="story-text">${textHtml}</p>
      <button class="big-btn secondary" id="story-narrate">🔊 Dinle</button>`;
    attachGlossHandlers(el);
    document.getElementById("story-narrate").addEventListener("click", ()=> speakEnglish(node.text));
    speakEnglish(node.text);
    if(node.quiz){
      el.innerHTML += `<div class="q-word" style="font-size:17px">${node.quiz.q}</div><div class="opt-grid" id="story-opt"></div>`;
      const grid = document.getElementById("story-opt");
      node.quiz.options.forEach((opt,i)=>{
        const btn = document.createElement("button");
        btn.className = "opt-btn";
        btn.textContent = opt;
        btn.addEventListener("click", ()=>{
          document.querySelectorAll("#story-opt .opt-btn").forEach((b,bi)=>{
            b.disabled = true;
            if(bi===node.quiz.answer) b.classList.add("correct");
            else if(bi===i) b.classList.add("wrong");
          });
          const correct = i===node.quiz.answer;
          if(correct) playCorrectSound(); else playWrongSound();
          setTimeout(()=> finishStory(correct), 700);
        });
        grid.appendChild(btn);
      });
    } else {
      el.innerHTML += `<button class="big-btn" onclick="finishStory(true)">Bitir</button>`;
    }
    return;
  }
  const textHtml = renderGlossText(node.text, story.gloss);
  el.innerHTML = `<h3>${story.title}</h3><p id="story-text">${textHtml}</p>
    <button class="big-btn secondary" id="story-narrate">🔊 Dinle</button>
    <div class="opt-grid" id="story-opt"></div>`;
  attachGlossHandlers(el);
  document.getElementById("story-narrate").addEventListener("click", ()=> speakEnglish(node.text));
  speakEnglish(node.text);
  const grid = document.getElementById("story-opt");
  node.choices.forEach(choice=>{
    const btn = document.createElement("button");
    btn.className = "opt-btn";
    btn.textContent = choice.label;
    btn.addEventListener("click", ()=>{ STORY_RUN.nodeKey = choice.next; renderStoryNode(false); });
    grid.appendChild(btn);
  });
}
function finishStory(correctQuiz){
  const { story } = STORY_RUN;
  const firstTry = !CUR.state.storiesDone.includes(story.id);
  if(firstTry) CUR.state.storiesDone.push(story.id);
  logActivity("story", story.id);
  closeModal("modal-story");
  renderStories();
  const xp = 15 + (correctQuiz?10:0);
  const diamonds = 5 + (correctQuiz?5:0);
  playFireworksSound();
  setTimeout(()=> speakTurkish("Tebrikler!"), 300);
  finishAndReward(xp, diamonds, `"${story.title}" hikâyesi tamamlandı!`);
}

/* ================= DİYALOG HİKÂYELERİ (Duolingo tarzı) ================= */
let DLG_RUN = null;
function openDialogueStory(id){
  const story = DIALOGUE_STORIES.find(s=>s.id===id);
  DLG_RUN = { story, i:0, correctChecks:0, totalChecks:0 };
  renderDialogueStep();
  openModal("modal-story");
}
function renderDialogueStep(){
  const { story, i } = DLG_RUN;
  const el = document.getElementById("story-content");
  if(i >= story.steps.length){ finishDialogueStory(); return; }
  const step = story.steps[i];

  if(step.type === "line"){
    const name = story.characters[step.speaker] || step.speaker;
    const textHtml = renderGlossText(step.text, story.gloss);
    el.innerHTML = `<h3>${story.title}</h3>
      <div class="howto-card">
        <div class="symbol">${name.split(" ").pop()}</div>
        <div><b>${name}</b><br><span id="dlg-text">${textHtml}</span></div>
      </div>
      <button class="big-btn secondary" id="dlg-narrate">🔊 Dinle</button>
      <button class="big-btn" id="dlg-next">Devam Et</button>`;
    attachGlossHandlers(el);
    document.getElementById("dlg-narrate").addEventListener("click", ()=> speakEnglish(step.text, step.speaker));
    speakEnglish(step.text, step.speaker);
    document.getElementById("dlg-next").addEventListener("click", ()=>{ DLG_RUN.i++; renderDialogueStep(); });
    return;
  }

  if(step.type === "check"){
    el.innerHTML = `<h3>${story.title}</h3>
      <div class="q-word" style="font-size:18px">${step.q}</div>
      <div class="opt-grid" id="dlg-opt"></div>`;
    const grid = document.getElementById("dlg-opt");
    step.options.forEach((opt,oi)=>{
      const btn = document.createElement("button");
      btn.className = "opt-btn";
      btn.textContent = opt;
      btn.addEventListener("click", ()=>{
        document.querySelectorAll("#dlg-opt .opt-btn").forEach((b,bi)=>{
          b.disabled = true;
          if(bi===step.answer) b.classList.add("correct");
          else if(bi===oi) b.classList.add("wrong");
        });
        DLG_RUN.totalChecks++;
        const correct = oi===step.answer;
        if(correct){ DLG_RUN.correctChecks++; playCorrectSound(); } else { playWrongSound(); }
        setTimeout(()=>{ DLG_RUN.i++; renderDialogueStep(); }, 800);
      });
      grid.appendChild(btn);
    });
    return;
  }

  if(step.type === "listen"){
    el.innerHTML = `<h3>${story.title}</h3>
      <p style="text-align:center;color:var(--text-soft)">Önce dinle, sonra ne duyduğunu seç.</p>
      <button class="big-btn secondary" id="dlg-listen-btn">🔊 Dinle</button>
      <div class="opt-grid" id="dlg-opt" style="margin-top:14px"></div>`;
    document.getElementById("dlg-listen-btn").addEventListener("click", ()=> speakEnglish(step.audio));
    speakEnglish(step.audio);
    const grid = document.getElementById("dlg-opt");
    step.options.forEach((opt,oi)=>{
      const btn = document.createElement("button");
      btn.className = "opt-btn";
      btn.textContent = opt;
      btn.addEventListener("click", ()=>{
        document.querySelectorAll("#dlg-opt .opt-btn").forEach((b,bi)=>{
          b.disabled = true;
          if(bi===step.answer) b.classList.add("correct");
          else if(bi===oi) b.classList.add("wrong");
        });
        DLG_RUN.totalChecks++;
        const correct = oi===step.answer;
        if(correct){ DLG_RUN.correctChecks++; playCorrectSound(); } else { playWrongSound(); }
        setTimeout(()=>{ DLG_RUN.i++; renderDialogueStep(); }, 800);
      });
      grid.appendChild(btn);
    });
    return;
  }
}
function finishDialogueStory(){
  const { story, correctChecks, totalChecks } = DLG_RUN;
  const firstTry = !CUR.state.storiesDone.includes(story.id);
  if(firstTry) CUR.state.storiesDone.push(story.id);
  logActivity("dialogue_story", story.id);
  closeModal("modal-story");
  renderStories();
  const xp = 18 + correctChecks*4;
  const diamonds = 6 + correctChecks*2;
  playFireworksSound();
  setTimeout(()=> speakTurkish("Tebrikler!"), 300);
  finishAndReward(xp, diamonds, `"${story.title}" diyalog hikâyesi tamamlandı! (${correctChecks}/${totalChecks} doğru)`);
}

/* ================= CHESS ================= */
const FILES = ["a","b","c","d","e","f","g","h"];
const PIECE_MAP = { k:"♚", K:"♔", q:"♛", Q:"♕", r:"♜", R:"♖", b:"♝", B:"♗", n:"♞", N:"♘", p:"♟", P:"♙" };

function renderChessList(){
  const wrap = document.getElementById("chess-list");
  wrap.innerHTML = "";
  CHESS_PUZZLES.forEach(p=>{
    const done = CUR.state.chessDone.includes(p.id);
    const card = document.createElement("div");
    card.className = "chess-card";
    card.innerHTML = `<div class="c-icon">♟️</div><div>${p.tag}</div><div style="font-size:12px;color:var(--text-soft)">Bulmaca ${p.id}</div>${done?'<div class="card-done-tag">Çözüldü</div>':''}`;
    card.addEventListener("click", ()=> openChessPuzzle(p.id));
    wrap.appendChild(card);
  });
}
let CHESS_RUN = null;
function openChessPuzzle(id){
  const puzzle = CHESS_PUZZLES.find(p=>p.id===id);
  CHESS_RUN = { puzzle, selected:null };
  renderChessPuzzle();
  openModal("modal-chess");
}
function squareName(r,c){ return FILES[c] + (8-r); }
function renderChessPuzzle(){
  const { puzzle, selected } = CHESS_RUN;
  const el = document.getElementById("chess-content");
  el.innerHTML = `<h3>${puzzle.tag}</h3><p>${puzzle.desc}</p><div class="chess-board" id="chess-board"></div><p id="chess-msg" style="min-height:20px;text-align:center"></p>`;
  const board = document.getElementById("chess-board");
  for(let r=0;r<8;r++){
    for(let c=0;c<8;c++){
      const sq = document.createElement("div");
      const name = squareName(r,c);
      sq.className = "sq " + ((r+c)%2===0 ? "light":"dark");
      const ch = puzzle.board[r][c];
      if(ch !== "."){ sq.textContent = PIECE_MAP[ch] || ""; }
      if(selected===name) sq.classList.add("selected");
      sq.addEventListener("click", ()=> chessSquareClick(name, ch));
      board.appendChild(sq);
    }
  }
}
function chessSquareClick(name, pieceChar){
  const run = CHESS_RUN;
  if(!run.selected){
    if(pieceChar !== "."){ run.selected = name; renderChessPuzzle(); }
    return;
  }
  // second click = target
  if(run.selected === run.puzzle.from && name === run.puzzle.to){
    document.getElementById("chess-msg").textContent = "✅ Doğru! " + run.puzzle.explain;
    playApplauseSound();
    const firstTry = !CUR.state.chessDone.includes(run.puzzle.id);
    if(firstTry) CUR.state.chessDone.push(run.puzzle.id);
    logActivity("chess", run.puzzle.id);
    setTimeout(()=>{
      closeModal("modal-chess");
      renderChessList();
      finishAndReward(20, 8, `${run.puzzle.tag} bulmacası çözüldü!`);
    }, 900);
  } else {
    document.getElementById("chess-msg").textContent = "❌ Yanlış hamle! Tekrar dene.";
    playWrongSound();
    run.selected = null;
    setTimeout(renderChessPuzzle, 500);
  }
}

/* --- Satranç: Nasıl Oynanır (öğretici) --- */
function openChessHowTo(){
  const el = document.getElementById("chess-howto-content");
  el.innerHTML = `<h3>♟️ Satrançta Taşlar Nasıl Hareket Eder?</h3>` +
    CHESS_TUTORIAL.map(t=>`
      <div class="howto-card">
        <div class="symbol">${t.symbol}</div>
        <div><b>${t.piece}</b><br>${t.desc}</div>
      </div>
    `).join("") +
    `<p style="color:var(--text-soft);font-size:13px;margin-top:10px">İpucu: Bulmacalarda önce hareket ettirmek istediğin taşa, sonra gitmesini istediğin kareye tıkla. Doğru hamlede alkış sesi, yanlış hamlede uyarı sesi duyarsın!</p>`;
  openModal("modal-chess-howto");
}

/* ===================================================================
   SATRANÇ MOTORU — Lumi'ye Karşı Oyna
   Gerçek satranç kurallarıyla (rok ve geçerken alma hariç, terfi
   otomatik vezire) oynanabilen basit bir motor + 3 zorluk seviyesinde
   yapay zekâ rakibi (Lumi).
=================================================================== */
const PIECE_VALUES = { P:1, N:3, B:3, R:5, Q:9, K:0 };
const KNIGHT_OFFS = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
const KING_OFFS   = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
const BISHOP_DIRS = [[-1,-1],[-1,1],[1,-1],[1,1]];
const ROOK_DIRS   = [[-1,0],[1,0],[0,-1],[0,1]];

function initialChessBoard(){
  return [
    ["r","n","b","q","k","b","n","r"],
    ["p","p","p","p","p","p","p","p"],
    [".",".",".",".",".",".",".","."],
    [".",".",".",".",".",".",".","."],
    [".",".",".",".",".",".",".","."],
    [".",".",".",".",".",".",".","."],
    ["P","P","P","P","P","P","P","P"],
    ["R","N","B","Q","K","B","N","R"],
  ];
}
function pieceColor(p){ if(p===".") return null; return p===p.toUpperCase() ? "w":"b"; }
function pieceType(p){ return p.toUpperCase(); }
function inBoard(r,c){ return r>=0 && r<8 && c>=0 && c<8; }

function generatePseudoMoves(board, color){
  const moves = [];
  for(let r=0;r<8;r++){
    for(let c=0;c<8;c++){
      const p = board[r][c];
      if(p==="." || pieceColor(p)!==color) continue;
      const type = pieceType(p);
      if(type==="P"){
        const dir = color==="w" ? -1 : 1;
        const startRow = color==="w" ? 6 : 1;
        const oneR = r+dir;
        if(inBoard(oneR,c) && board[oneR][c]==="."){
          moves.push(makePawnMove(r,c,oneR,c,color,false));
          const twoR = r+2*dir;
          if(r===startRow && board[twoR][c]==="."){
            moves.push({from:[r,c],to:[twoR,c],capture:false,promotion:false});
          }
        }
        for(const dc of [-1,1]){
          const nr=r+dir, nc=c+dc;
          if(inBoard(nr,nc) && board[nr][nc]!=="." && pieceColor(board[nr][nc])!==color){
            moves.push(makePawnMove(r,c,nr,nc,color,true));
          }
        }
      } else if(type==="N"){
        for(const [dr,dc] of KNIGHT_OFFS){
          const nr=r+dr, nc=c+dc;
          if(inBoard(nr,nc) && pieceColor(board[nr][nc])!==color)
            moves.push({from:[r,c],to:[nr,nc],capture:board[nr][nc]!==".",promotion:false});
        }
      } else if(type==="K"){
        for(const [dr,dc] of KING_OFFS){
          const nr=r+dr, nc=c+dc;
          if(inBoard(nr,nc) && pieceColor(board[nr][nc])!==color)
            moves.push({from:[r,c],to:[nr,nc],capture:board[nr][nc]!==".",promotion:false});
        }
      } else {
        const dirs = type==="B" ? BISHOP_DIRS : type==="R" ? ROOK_DIRS : BISHOP_DIRS.concat(ROOK_DIRS);
        for(const [dr,dc] of dirs){
          let nr=r+dr, nc=c+dc;
          while(inBoard(nr,nc)){
            if(board[nr][nc]==="."){
              moves.push({from:[r,c],to:[nr,nc],capture:false,promotion:false});
            } else {
              if(pieceColor(board[nr][nc])!==color) moves.push({from:[r,c],to:[nr,nc],capture:true,promotion:false});
              break;
            }
            nr+=dr; nc+=dc;
          }
        }
      }
    }
  }
  return moves;
}
function makePawnMove(r,c,nr,nc,color,capture){
  const promotion = (color==="w" && nr===0) || (color==="b" && nr===7);
  return { from:[r,c], to:[nr,nc], capture:!!capture, promotion };
}
function isSquareAttacked(board, tr, tc, byColor){
  const dir = byColor==="w" ? -1 : 1;
  const pr = tr - dir;
  for(const dc of [-1,1]){
    const pc = tc+dc;
    if(inBoard(pr,pc)){
      const p = board[pr][pc];
      if(p!=="." && pieceColor(p)===byColor && pieceType(p)==="P") return true;
    }
  }
  for(const [dr,dc] of KNIGHT_OFFS){
    const nr=tr+dr, nc=tc+dc;
    if(inBoard(nr,nc)){
      const p=board[nr][nc];
      if(p!=="." && pieceColor(p)===byColor && pieceType(p)==="N") return true;
    }
  }
  for(const [dr,dc] of KING_OFFS){
    const nr=tr+dr, nc=tc+dc;
    if(inBoard(nr,nc)){
      const p=board[nr][nc];
      if(p!=="." && pieceColor(p)===byColor && pieceType(p)==="K") return true;
    }
  }
  for(const [dr,dc] of BISHOP_DIRS){
    let nr=tr+dr, nc=tc+dc;
    while(inBoard(nr,nc)){
      const p=board[nr][nc];
      if(p!=="."){ if(pieceColor(p)===byColor && (pieceType(p)==="B"||pieceType(p)==="Q")) return true; break; }
      nr+=dr; nc+=dc;
    }
  }
  for(const [dr,dc] of ROOK_DIRS){
    let nr=tr+dr, nc=tc+dc;
    while(inBoard(nr,nc)){
      const p=board[nr][nc];
      if(p!=="."){ if(pieceColor(p)===byColor && (pieceType(p)==="R"||pieceType(p)==="Q")) return true; break; }
      nr+=dr; nc+=dc;
    }
  }
  return false;
}
function findKing(board,color){
  const target = color==="w" ? "K":"k";
  for(let r=0;r<8;r++) for(let c=0;c<8;c++) if(board[r][c]===target) return [r,c];
  return null;
}
function isKingInCheck(board,color){
  const kp = findKing(board,color);
  if(!kp) return false;
  return isSquareAttacked(board, kp[0], kp[1], color==="w"?"b":"w");
}
function applyChessMove(board, move){
  const nb = board.map(row=>row.slice());
  const [fr,fc]=move.from, [tr,tc]=move.to;
  let piece = nb[fr][fc];
  if(move.promotion) piece = pieceColor(piece)==="w" ? "Q":"q";
  nb[tr][tc]=piece;
  nb[fr][fc]=".";
  return nb;
}
function generateLegalMoves(board,color){
  const pseudo = generatePseudoMoves(board,color);
  const legal = [];
  for(const m of pseudo){
    const nb = applyChessMove(board,m);
    if(!isKingInCheck(nb,color)) legal.push(m);
  }
  return legal;
}
function evaluateChessBoard(board){
  let score = 0;
  for(let r=0;r<8;r++) for(let c=0;c<8;c++){
    const p = board[r][c];
    if(p===".") continue;
    const val = PIECE_VALUES[pieceType(p)];
    const centerBonus = (r>=3 && r<=4 && c>=3 && c<=4) ? 0.15 : 0;
    score += pieceColor(p)==="w" ? (val+centerBonus) : -(val+centerBonus);
  }
  return score;
}
function chessMinimax(board, depth, alpha, beta, maximizing){
  const color = maximizing ? "w" : "b";
  const moves = generateLegalMoves(board,color);
  if(moves.length===0){
    if(isKingInCheck(board,color)) return maximizing ? -1000 : 1000;
    return 0;
  }
  if(depth===0) return evaluateChessBoard(board);
  if(maximizing){
    let best = -Infinity;
    for(const m of moves){
      const val = chessMinimax(applyChessMove(board,m), depth-1, alpha, beta, false);
      best = Math.max(best,val);
      alpha = Math.max(alpha,best);
      if(beta<=alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for(const m of moves){
      const val = chessMinimax(applyChessMove(board,m), depth-1, alpha, beta, true);
      best = Math.min(best,val);
      beta = Math.min(beta,best);
      if(beta<=alpha) break;
    }
    return best;
  }
}
function chooseLumiMove(board, difficulty){
  const moves = generateLegalMoves(board,"b");
  if(!moves.length) return null;
  if(difficulty==="easy"){
    const captures = moves.filter(m=>m.capture);
    if(captures.length && Math.random()<0.6) return captures[Math.floor(Math.random()*captures.length)];
    return moves[Math.floor(Math.random()*moves.length)];
  }
  const depth = difficulty==="medium" ? 2 : 3;
  let bestMove=null, bestVal=Infinity;
  shuffle(moves).forEach(m=>{
    const val = chessMinimax(applyChessMove(board,m), depth-1, -Infinity, Infinity, true);
    if(val < bestVal){ bestVal=val; bestMove=m; }
  });
  return bestMove;
}

let CHESS_MATCH = null;
function openChessMatchPicker(){
  const el = document.getElementById("chess-content");
  el.innerHTML = `<h3>🐲 Lumi'ye Karşı Oyna</h3>
    <p style="color:var(--text-soft)">Bir zorluk seviyesi seç. Sen beyaz taşlarla başlarsın.</p>
    <div class="opt-grid">
      <button class="opt-btn" id="diff-easy">🟢 Başlangıç</button>
      <button class="opt-btn" id="diff-medium">🟡 Orta Seviye</button>
      <button class="opt-btn" id="diff-hard">🔴 Zorlu</button>
    </div>`;
  document.getElementById("diff-easy").addEventListener("click", ()=> startChessMatch("easy"));
  document.getElementById("diff-medium").addEventListener("click", ()=> startChessMatch("medium"));
  document.getElementById("diff-hard").addEventListener("click", ()=> startChessMatch("hard"));
  openModal("modal-chess");
}
function startChessMatch(difficulty){
  CHESS_MATCH = { board: initialChessBoard(), turn:"w", difficulty, selected:null, legalForSelected:[], over:false };
  renderChessMatch();
}
function chessMatchSquareName(r,c){ return FILES[c] + (8-r); }
function renderChessMatch(){
  const m = CHESS_MATCH;
  const el = document.getElementById("chess-content");
  const diffLabel = { easy:"🟢 Başlangıç", medium:"🟡 Orta Seviye", hard:"🔴 Zorlu" }[m.difficulty];
  el.innerHTML = `<h3>🐲 Lumi'ye Karşı — ${diffLabel}</h3>
    <p id="chess-match-status" style="text-align:center;min-height:20px">${m.turn==="w" ? "Senin sıran (beyaz)" : "Lumi düşünüyor..."}</p>
    <div class="chess-board" id="chess-match-board"></div>
    <button class="big-btn secondary" id="chess-resign" style="margin-top:10px">🏳️ Oyunu Bırak</button>`;
  const boardEl = document.getElementById("chess-match-board");
  for(let r=0;r<8;r++){
    for(let c=0;c<8;c++){
      const sq = document.createElement("div");
      const name = chessMatchSquareName(r,c);
      sq.className = "sq " + ((r+c)%2===0 ? "light":"dark");
      const ch = m.board[r][c];
      if(ch !== ".") sq.textContent = PIECE_MAP[ch] || "";
      if(m.selected && m.selected[0]===r && m.selected[1]===c) sq.classList.add("selected");
      if(m.legalForSelected.some(mv=> mv.to[0]===r && mv.to[1]===c)) sq.classList.add("target-hint");
      sq.addEventListener("click", ()=> chessMatchSquareClick(r,c));
      boardEl.appendChild(sq);
    }
  }
  document.getElementById("chess-resign").addEventListener("click", ()=>{ closeModal("modal-chess"); renderChessList(); });
}
function chessMatchSquareClick(r,c){
  const m = CHESS_MATCH;
  if(m.over || m.turn!=="w") return;
  const piece = m.board[r][c];
  if(!m.selected){
    if(piece!=="." && pieceColor(piece)==="w"){
      const allLegal = generateLegalMoves(m.board,"w");
      m.selected = [r,c];
      m.legalForSelected = allLegal.filter(mv=> mv.from[0]===r && mv.from[1]===c);
      renderChessMatch();
    }
    return;
  }
  const chosen = m.legalForSelected.find(mv=> mv.to[0]===r && mv.to[1]===c);
  if(chosen){
    playCorrectSound();
    m.board = applyChessMove(m.board, chosen);
    m.selected = null; m.legalForSelected = [];
    m.turn = "b";
    renderChessMatch();
    setTimeout(()=> chessMatchAfterPlayerMove(), 500);
  } else if(piece!=="." && pieceColor(piece)==="w"){
    // farklı bir kendi taşını seçmeye çalışıyor
    const allLegal = generateLegalMoves(m.board,"w");
    m.selected = [r,c];
    m.legalForSelected = allLegal.filter(mv=> mv.from[0]===r && mv.from[1]===c);
    renderChessMatch();
  } else {
    playWrongSound();
    m.selected = null; m.legalForSelected = [];
    renderChessMatch();
  }
}
function chessMatchAfterPlayerMove(){
  const m = CHESS_MATCH;
  const blackLegal = generateLegalMoves(m.board,"b");
  if(blackLegal.length===0){
    if(isKingInCheck(m.board,"b")) return chessMatchEnd("win");
    return chessMatchEnd("draw");
  }
  document.getElementById("chess-match-status") && (document.getElementById("chess-match-status").textContent = "Lumi düşünüyor...");
  setTimeout(()=>{
    const aiMove = chooseLumiMove(m.board, m.difficulty);
    if(!aiMove) return chessMatchEnd("win");
    m.board = applyChessMove(m.board, aiMove);
    m.turn = "w";
    const whiteLegal = generateLegalMoves(m.board,"w");
    if(whiteLegal.length===0){
      if(isKingInCheck(m.board,"w")) return chessMatchEnd("lose");
      return chessMatchEnd("draw");
    }
    renderChessMatch();
    if(isKingInCheck(m.board,"w")) playWrongSound();
  }, 400);
}
function chessMatchEnd(result){
  const m = CHESS_MATCH;
  m.over = true;
  const diffBonus = { easy:1, medium:1.6, hard:2.2 }[m.difficulty];
  let xp=0, diamonds=0, note="";
  if(result==="win"){
    playApplauseSound(); playFireworksSound();
    setTimeout(()=> speakTurkish("Tebrikler, kazandın!"), 300);
    xp = Math.round(25*diffBonus); diamonds = Math.round(10*diffBonus);
    note = `🎉 Lumi'yi yendin! (${ {easy:"Başlangıç",medium:"Orta Seviye",hard:"Zorlu"}[m.difficulty] })`;
    CUR.state.lumiWins = (CUR.state.lumiWins||0) + 1;
  } else if(result==="draw"){
    xp = 10; diamonds = 4;
    note = "🤝 Berabere kaldınız! İyi bir oyundu.";
  } else {
    xp = 6; diamonds = 2;
    note = "Lumi bu sefer kazandı, ama harika bir denemeydi! Tekrar dene.";
  }
  logActivity("chess_match", m.difficulty+"_"+result);
  closeModal("modal-chess");
  renderChessList();
  finishAndReward(xp, diamonds, note);
}

/* ================= GAMES ================= */
function openGame(kind){
  openModal("modal-game");
  if(kind==="memory") startMemoryGame();
  else if(kind==="bubbles") startBubbleGame();
  else if(kind==="sentence") startSentenceGame();
  else if(kind==="match") startMatchGame();
  else if(kind==="pronounce") startPronounceGame();
  else if(kind==="blank") startBlankGame();
  else if(kind==="speak") startSpeakingGame();
  else if(kind==="quiz") startQuizGame();
}
function randomWordPool(n){
  return shuffle(ALL_WORDS).slice(0,n);
}
function gameFinish(xp, diamonds, note){
  CUR.state.gamesDone++;
  logActivity("game", note);
  closeModal("modal-game");
  playFireworksSound();
  setTimeout(()=> speakTurkish("Tebrikler!"), 300);
  finishAndReward(xp, diamonds, note);
}

/* --- Memory Cards --- */
function startMemoryGame(){
  const pairs = randomWordPool(8);
  let cards = [];
  pairs.forEach((p,i)=>{ cards.push({id:i,text:p[0],key:i}); cards.push({id:i,text:p[1],key:i}); });
  cards = shuffle(cards);
  let flipped = [], matched = new Set(), locked = false;
  const el = document.getElementById("game-content");
  el.innerHTML = `<h3>🧠 Hafıza Kartları</h3><p>Eşleşen İngilizce-Türkçe kelimeleri bul.</p><div class="memory-grid" id="mem-grid"></div>`;
  const grid = document.getElementById("mem-grid");
  cards.forEach((c, idx)=>{
    const div = document.createElement("div");
    div.className = "mem-card";
    div.dataset.idx = idx;
    div.textContent = "?";
    div.addEventListener("click", ()=>{
      if(locked || div.classList.contains("flipped") || div.classList.contains("matched")) return;
      div.textContent = c.text;
      div.classList.add("flipped");
      flipped.push({idx, key:c.id, div});
      if(flipped.length===2){
        locked = true;
        setTimeout(()=>{
          if(flipped[0].key === flipped[1].key){
            playCorrectSound();
            flipped.forEach(f=> f.div.classList.replace("flipped","matched"));
            matched.add(flipped[0].key);
            if(matched.size === pairs.length){
              gameFinish(20, 10, "Hafıza kartları oyunu tamamlandı!");
            }
          } else {
            playWrongSound();
            flipped.forEach(f=>{ f.div.classList.remove("flipped"); f.div.textContent="?"; });
          }
          flipped = []; locked = false;
        }, 700);
      }
    });
    grid.appendChild(div);
  });
}

/* --- Word Bubbles --- */
function startBubbleGame(){
  const rounds = randomWordPool(8);
  let ri = 0, score = 0;
  function nextRound(){
    if(ri >= rounds.length){ gameFinish(10+score*2, score, `Kelime Balonları: ${score}/${rounds.length} doğru.`); return; }
    const correct = rounds[ri];
    const distractors = shuffle(ALL_WORDS.filter(p=>p[0]!==correct[0])).slice(0,3);
    const options = shuffle([correct, ...distractors]);
    const el = document.getElementById("game-content");
    el.innerHTML = `<h3>🫧 Kelime Balonları</h3><div class="q-word">${correct[1]}</div><div class="bubble-row" id="bubble-row"></div>`;
    const row = document.getElementById("bubble-row");
    options.forEach(opt=>{
      const b = document.createElement("div");
      b.className = "bubble";
      b.textContent = opt[0];
      b.addEventListener("click", ()=>{
        if(opt[0]===correct[0]){ score++; playCorrectSound(); speakEnglish(opt[0]); }
        else{ playWrongSound(); }
        ri++; setTimeout(nextRound, 500);
      });
      row.appendChild(b);
    });
  }
  nextRound();
}

/* --- Sentence Builder --- */
function startSentenceGame(){
  const sentence = SENTENCES[Math.floor(Math.random()*SENTENCES.length)];
  const scrambled = shuffle(sentence.words.map((w,i)=>({w,i})));
  let built = [];
  let statusMsg = "";
  const usedFlags = new Array(sentence.words.length).fill(false);
  function render(){
    const el = document.getElementById("game-content");
    el.innerHTML = `<h3>🧩 Cümle Kurma</h3><p>Türkçesi: <b>${sentence.tr}</b></p>
      <div class="chip-row" id="answer-row"></div>
      <div class="chip-row" id="chip-row"></div>
      <p id="sentence-status" style="text-align:center;min-height:20px">${statusMsg}</p>
      <button class="big-btn" id="check-sentence">Kontrol Et</button>`;
    const ansRow = document.getElementById("answer-row");
    built.forEach(item=>{
      const chip = document.createElement("div"); chip.className="chip"; chip.textContent=item.w;
      chip.addEventListener("click", ()=>{ built = built.filter(x=>x!==item); usedFlags[item.i]=false; statusMsg=""; render(); });
      ansRow.appendChild(chip);
    });
    const chipRow = document.getElementById("chip-row");
    scrambled.forEach(item=>{
      const chip = document.createElement("div");
      chip.className = "chip" + (usedFlags[item.i] ? " used":"");
      chip.textContent = item.w;
      if(!usedFlags[item.i]) chip.addEventListener("click", ()=>{ built.push(item); usedFlags[item.i]=true; statusMsg=""; render(); });
      chipRow.appendChild(chip);
    });
    document.getElementById("check-sentence").addEventListener("click", ()=>{
      const answer = built.map(x=>x.w).join(" ");
      const correct = sentence.words.join(" ");
      if(answer === correct){
        playCorrectSound();
        gameFinish(18, 8, "Cümle Kurma oyunu tamamlandı!");
      } else {
        playWrongSound();
        statusMsg = "❌ Tekrar dene! Doğru sıralamayı bulmaya çalış.";
        render();
      }
    });
  }
  render();
}

/* --- Quick Match --- */
function startMatchGame(){
  const pairs = randomWordPool(6);
  const left = shuffle(pairs.map((p,i)=>({text:p[0], key:i})));
  const right = shuffle(pairs.map((p,i)=>({text:p[1], key:i})));
  let selL = null, selR = null, matchedCount = 0, startTime = Date.now();
  const el = document.getElementById("game-content");
  el.innerHTML = `<h3>⚡ Hızlı Eşleştirme</h3><div class="timer-badge" id="match-timer">0 sn</div><div class="match-cols"><div class="match-col" id="col-l"></div><div class="match-col" id="col-r"></div></div>`;
  const colL = document.getElementById("col-l"), colR = document.getElementById("col-r");
  const timerEl = document.getElementById("match-timer");
  const timerInt = setInterval(()=>{ timerEl.textContent = Math.floor((Date.now()-startTime)/1000)+" sn"; }, 500);
  left.forEach(item=>{
    const div = document.createElement("div"); div.className="match-item"; div.textContent=item.text;
    div.addEventListener("click", ()=>{
      if(div.classList.contains("matched")) return;
      colL.querySelectorAll(".match-item").forEach(d=>d.classList.remove("selected"));
      div.classList.add("selected"); selL = {item, div};
      tryMatch();
    });
    colL.appendChild(div);
  });
  right.forEach(item=>{
    const div = document.createElement("div"); div.className="match-item"; div.textContent=item.text;
    div.addEventListener("click", ()=>{
      if(div.classList.contains("matched")) return;
      colR.querySelectorAll(".match-item").forEach(d=>d.classList.remove("selected"));
      div.classList.add("selected"); selR = {item, div};
      tryMatch();
    });
    colR.appendChild(div);
  });
  function tryMatch(){
    if(!selL || !selR) return;
    if(selL.item.key === selR.item.key){
      playCorrectSound();
      selL.div.classList.add("matched"); selR.div.classList.add("matched");
      selL.div.classList.remove("selected"); selR.div.classList.remove("selected");
      matchedCount++;
      if(matchedCount===pairs.length){
        clearInterval(timerInt);
        const secs = Math.floor((Date.now()-startTime)/1000);
        const bonus = secs<20 ? 15 : (secs<40 ? 10 : 5);
        gameFinish(10+bonus, bonus, `Hızlı Eşleştirme ${secs} saniyede tamamlandı!`);
      }
    } else {
      playWrongSound();
      setTimeout(()=>{ selL.div.classList.remove("selected"); selR.div.classList.remove("selected"); selL=null; selR=null; }, 400);
      return;
    }
    selL = null; selR = null;
  }
}

/* --- Pronunciation (dinle ve doğru kelimeyi seç) --- */
function startPronounceGame(){
  const rounds = randomWordPool(6);
  let ri = 0, score = 0;
  function nextRound(){
    if(ri >= rounds.length){ gameFinish(10+score*2, score, `Doğru Telaffuz: ${score}/${rounds.length} doğru.`); return; }
    const correct = rounds[ri];
    const distractors = shuffle(ALL_WORDS.filter(p=>p[0]!==correct[0])).slice(0,2);
    const options = shuffle([correct, ...distractors]);
    const el = document.getElementById("game-content");
    el.innerHTML = `<h3>🎤 Doğru Telaffuz</h3><p>Sesi dinle ve doğru kelimeyi seç.</p>
      <button class="big-btn secondary" id="speak-btn">🔊 Tekrar Dinle</button>
      <div class="opt-grid" id="pron-opts" style="margin-top:14px"></div>`;
    document.getElementById("speak-btn").addEventListener("click", ()=> speakEnglish(correct[0]));
    speakEnglish(correct[0]);
    const grid = document.getElementById("pron-opts");
    options.forEach(opt=>{
      const btn = document.createElement("button");
      btn.className = "opt-btn";
      btn.textContent = opt[0] + " (" + opt[1] + ")";
      btn.addEventListener("click", ()=>{
        if(opt[0]===correct[0]){ score++; playCorrectSound(); } else { playWrongSound(); }
        ri++; setTimeout(nextRound, 500);
      });
      grid.appendChild(btn);
    });
  }
  nextRound();
}

/* --- Boşluk Doldurma / Cümle Tamamlama --- */
function startBlankGame(){
  const rounds = shuffle(BLANK_SENTENCES).slice(0, 8);
  let ri = 0, score = 0;
  function nextRound(){
    if(ri >= rounds.length){ gameFinish(10+score*2, score, `Boşluk Doldurma: ${score}/${rounds.length} doğru.`); return; }
    const item = rounds[ri];
    const options = shuffle(item.options);
    const el = document.getElementById("game-content");
    el.innerHTML = `<h3>✏️ Boşluk Doldurma</h3>
      <div class="q-word" style="font-size:20px">${item.sentence}</div>
      <p class="sentence-tr">${item.tr}</p>
      <button class="big-btn secondary" id="blank-speak">🔊 Cümleyi Dinle</button>
      <div class="opt-grid" id="blank-opts" style="margin-top:14px"></div>`;
    document.getElementById("blank-speak").addEventListener("click", ()=> speakEnglish(item.sentence.replace("___", item.answer)));
    speakEnglish(item.sentence.replace("___", item.answer));
    const grid = document.getElementById("blank-opts");
    options.forEach(opt=>{
      const btn = document.createElement("button");
      btn.className = "opt-btn";
      btn.textContent = opt;
      btn.addEventListener("click", ()=>{
        if(opt===item.answer){ score++; playCorrectSound(); } else { playWrongSound(); }
        ri++; setTimeout(nextRound, 600);
      });
      grid.appendChild(btn);
    });
  }
  nextRound();
}

/* --- Karma Quiz (tamamlanan derslerden karışık tekrar sınavı) --- */
function startQuizGame(){
  const doneIdx = CUR.state.lessonsDone;
  const el0 = document.getElementById("game-content");
  if(!doneIdx.length){
    el0.innerHTML = `<h3>🧠 Karma Quiz</h3><p style="color:var(--text-soft)">Quiz için önce en az bir ders tamamlaman gerekiyor. Ders Yolu'ndan bir ders bitirip tekrar dene!</p>
      <button class="big-btn" onclick="closeModal('modal-game')">Tamam</button>`;
    return;
  }
  const pool = doneIdx.flatMap(i=> LESSONS[i].w);
  const rounds = shuffle(pool).slice(0, Math.min(10, pool.length));
  let ri = 0, score = 0;
  function nextRound(){
    if(ri >= rounds.length){ gameFinish(12+score*2, score, `Karma Quiz: ${score}/${rounds.length} doğru.`); return; }
    const pair = rounds[ri];
    const dir = Math.random()<0.5 ? "entr" : "tren";
    const correct = dir==="entr" ? pair[1] : pair[0];
    const promptWord = dir==="entr" ? pair[0] : pair[1];
    const distractors = shuffle(pool.filter(p=> (dir==="entr"?p[1]:p[0]) !== correct)).slice(0,3).map(p=> dir==="entr"?p[1]:p[0]);
    const options = shuffle([correct, ...distractors]);
    const el = document.getElementById("game-content");
    el.innerHTML = `<h3>🧠 Karma Quiz</h3>
      <p style="text-align:center;color:var(--text-soft)">Soru ${ri+1}/${rounds.length}</p>
      <div class="q-word" style="cursor:pointer" id="quiz-word">${promptWord} 🔊</div>
      <div class="opt-grid" id="quiz-opts"></div>`;
    speakEnglish(pair[0]);
    document.getElementById("quiz-word").addEventListener("click", ()=> speakEnglish(pair[0]));
    const grid = document.getElementById("quiz-opts");
    options.forEach(opt=>{
      const btn = document.createElement("button");
      btn.className = "opt-btn";
      btn.textContent = opt;
      btn.addEventListener("click", ()=>{
        document.querySelectorAll("#quiz-opts .opt-btn").forEach(b=> b.disabled = true);
        if(opt===correct){ score++; playCorrectSound(); btn.classList.add("correct"); }
        else { playWrongSound(); btn.classList.add("wrong"); }
        ri++; setTimeout(nextRound, 700);
      });
      grid.appendChild(btn);
    });
  }
  nextRound();
}

/* --- Konuşma Pratiği (Mikrofonla Telaffuz) ---
   Sistem önce kelimeyi/cümleyi seslendirir, çocuk mikrofonla tekrarlar.
   Doğruysa "Bravo, doğru!", yanlışsa "Yanlış, tekrar et." seslendirilir. */
function startSpeakingGame(){
  const rounds = randomWordPool(6);
  let ri = 0, score = 0;
  const hasRecognition = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  function nextRound(){
    if(ri >= rounds.length){ gameFinish(12+score*2, score, `Konuşma Pratiği: ${score}/${rounds.length} doğru.`); return; }
    const target = rounds[ri];
    const el = document.getElementById("game-content");
    el.innerHTML = `<h3>🗣️ Konuşma Pratiği</h3>
      <p>Önce kelimeyi dinle, sonra mikrofona basıp aynı şekilde söylemeye çalış.</p>
      <div class="q-word">${target[0]} <span style="font-size:14px;color:var(--text-soft)">(${target[1]})</span></div>
      <button class="big-btn secondary" id="speak-listen">🔊 Tekrar Dinle</button>
      <button class="mic-btn" id="mic-btn" title="Mikrofona bas ve tekrar et">🎤</button>
      <p id="speak-status" style="text-align:center;color:var(--text-soft)">${hasRecognition ? "Mikrofona basıp kelimeyi söyle." : "Bu tarayıcıda mikrofon tanıma desteklenmiyor. Yine de telaffuzu dinleyip pratik yapabilirsin."}</p>`;
    document.getElementById("speak-listen").addEventListener("click", ()=> speakEnglish(target[0]));
    speakEnglish(target[0]);
    const micBtn = document.getElementById("mic-btn");
    micBtn.addEventListener("click", ()=> tryRecognize(target, micBtn));
  }
  function tryRecognize(target, micBtn){
    const statusEl = document.getElementById("speak-status");
    if(!hasRecognition){
      statusEl.textContent = "Mikrofon desteklenmiyor. Bir sonraki kelimeye geçebilirsin.";
      return;
    }
    try{
      const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new Recognition();
      rec.lang = "en-US";
      rec.maxAlternatives = 3;
      micBtn.classList.add("listening");
      micBtn.disabled = true;
      statusEl.textContent = "Dinleniyor... şimdi söyle!";
      rec.start();
      rec.onresult = (event)=>{
        micBtn.classList.remove("listening");
        micBtn.disabled = false;
        const said = event.results[0][0].transcript.toLowerCase().trim();
        const expected = target[0].toLowerCase().trim();
        const isMatch = said === expected || said.includes(expected) || expected.includes(said);
        if(isMatch){
          // Doğru telaffuz: bravo + alkış sesi, sonraki kelimeye geçilir.
          score++;
          playCorrectSound();
          playApplauseSound();
          statusEl.textContent = "✅ Bravo, doğru!";
          speakTurkish("Bravo, doğru!");
          setTimeout(()=>{ ri++; nextRound(); }, 1800);
        } else {
          // Yanlış telaffuz: doğru söyleyene kadar aynı kelime tekrar edilir, ilerlemez.
          playWrongSound();
          statusEl.textContent = `❌ Yanlış, tekrar et. (Duyulan: "${said}")`;
          speakTurkish("Yanlış, tekrar et.");
        }
      };
      rec.onerror = ()=>{
        micBtn.classList.remove("listening");
        micBtn.disabled = false;
        statusEl.textContent = "Mikrofon algılanamadı, tekrar dene.";
      };
      rec.onend = ()=>{ micBtn.classList.remove("listening"); micBtn.disabled = false; };
    }catch(e){
      statusEl.textContent = "Mikrofon kullanılamıyor.";
    }
  }
  nextRound();
}

/* ================= REWARDS CLOSET ================= */
function renderRewards(){
  const badgeGrid = document.getElementById("badge-grid");
  badgeGrid.innerHTML = "";
  BADGES.forEach(b=>{
    const unlocked = CUR.state.badgesUnlocked.includes(b.id);
    const div = document.createElement("div");
    div.className = "badge-card " + (unlocked?"unlocked":"locked");
    div.innerHTML = `<div style="font-size:26px">🏅</div><div>${b.name}</div><div style="font-size:11px;color:var(--text-soft)">${b.desc}</div>`;
    badgeGrid.appendChild(div);
  });

  const chestArea = document.getElementById("chest-area");
  chestArea.innerHTML = "";
  if(!CUR.state.chestInventory.length){
    chestArea.innerHTML = `<p style="color:var(--text-soft)">Her ${CHEST_STEP} dersi tamamladığında envantere yeni bir sandık eklenir!</p>`;
  } else {
    const invWrap = document.createElement("div");
    invWrap.className = "chest-inventory";
    CUR.state.chestInventory.forEach(chest=>{
      const div = document.createElement("div");
      div.className = "chest-slot" + (chest.opened ? " opened" : "");
      div.textContent = chest.opened ? "📭" : "📦";
      div.title = chest.opened ? "Açıldı" : "Açmak için tıkla";
      if(!chest.opened) div.addEventListener("click", ()=> openChestAnimated(chest.id));
      invWrap.appendChild(div);
    });
    chestArea.appendChild(invWrap);
  }

  const costumeGrid = document.getElementById("costume-grid");
  costumeGrid.innerHTML = "";
  LUMI_COSTUMES.forEach((name,i)=>{
    const unlocked = levelFromXP(CUR.state.xp) >= i*2+1;
    const div = document.createElement("div");
    div.className = "costume-card " + (unlocked?"":"locked") + (CUR.state.costume===i?" unlocked":"");
    div.innerHTML = `<div style="font-size:26px">🐲</div><div>${name}</div>`;
    if(unlocked) div.addEventListener("click", ()=>{ CUR.state.costume=i; saveState(); renderRewards(); });
    costumeGrid.appendChild(div);
  });

  const frameGrid = document.getElementById("frame-grid");
  frameGrid.innerHTML = "";
  AVATAR_FRAMES.forEach((name,i)=>{
    const unlocked = levelFromXP(CUR.state.xp) >= i*2+1;
    const div = document.createElement("div");
    div.className = "frame-card " + (unlocked?"":"locked");
    div.innerHTML = `<div style="font-size:26px">🖼️</div><div>${name}</div>`;
    if(unlocked) div.addEventListener("click", ()=>{ CUR.state.frame=i; saveState(); renderRewards(); });
    frameGrid.appendChild(div);
  });

  const petGrid = document.getElementById("pet-grid");
  petGrid.innerHTML = "";
  PET_DRAGONS.forEach((name,i)=>{
    const unlocked = CUR.state.diamonds >= (i+1)*20;
    const div = document.createElement("div");
    div.className = "pet-card " + (unlocked?"":"locked");
    div.innerHTML = `<div style="font-size:26px">🐉</div><div>${name}</div>`;
    if(unlocked) div.addEventListener("click", ()=>{ CUR.state.pet=i; saveState(); renderRewards(); });
    petGrid.appendChild(div);
  });
}
function openChestAnimated(chestId){
  const chest = CUR.state.chestInventory.find(c=>c.id===chestId);
  if(!chest || chest.opened) return;
  const roll = Math.random();
  let xp=0, diamonds=0, note="";
  if(roll < 0.5){ diamonds = 10 + Math.floor(Math.random()*10); note = "Sandıktan elmas çıktı!"; }
  else if(roll < 0.85){ xp = 20; diamonds = 5; note = "Sandıktan XP ve elmas çıktı!"; }
  else { diamonds = 30; note = "Büyük ödül! Sandıktan bol elmas çıktı!"; }

  const el = document.getElementById("reward-content");
  el.innerHTML = `
    <div class="chest-opening-stage">
      <div class="chest-glow" id="chest-glow"></div>
      <div class="chest-visual shaking" id="chest-visual">📦</div>
      <p id="chest-status" style="color:var(--text-soft)">Sandık açılıyor...</p>
    </div>
  `;
  openModal("modal-reward");
  playChestSound();
  // Yavaşça açılma: sallanma -> ışıklandırma -> ödül
  setTimeout(()=>{
    const visual = document.getElementById("chest-visual");
    const glow = document.getElementById("chest-glow");
    if(!visual) return;
    visual.classList.remove("shaking");
    visual.classList.add("opened-visual");
    visual.textContent = "📭";
    glow.classList.add("burst");
    document.getElementById("chest-status").textContent = "Işıklar parlıyor...";
  }, 1500);
  setTimeout(()=>{
    chest.opened = true;
    addXP(xp); addDiamonds(diamonds);
    const newBadges = checkNewBadges();
    saveState();
    renderHeader(); renderRewards();
    showRewardPopup(xp, diamonds, "🎁 " + note, newBadges);
  }, 2600);
}

/* ================= PARENT PANEL ================= */
function renderParentPicker(){
  document.getElementById("parent-report").innerHTML = "<p style='color:var(--text-soft)'>Raporu görmek için bir çocuk seç.</p>";
}
function renderParentReport(){
  if(!PARENT_CHILD) return;
  const state = loadState(PARENT_CHILD);
  const el = document.getElementById("parent-report");
  const level = levelFromXP(state.xp);
  const weekAgo = Date.now() - 7*24*3600*1000;
  const weekActs = state.activityLog.filter(a=>a.ts >= weekAgo);
  const monthAgo = Date.now() - 30*24*3600*1000;
  const monthActs = state.activityLog.filter(a=>a.ts >= monthAgo);

  const mistakesSorted = Object.entries(state.mistakes).sort((a,b)=>b[1]-a[1]).slice(0,6);
  const strongLessons = Object.entries(state.lessonScores)
    .filter(([idx,sc])=> sc.correct===sc.total)
    .map(([idx])=> LESSONS[idx].t).slice(0,6);

  el.innerHTML = `
    <h2>${AVATARS[PARENT_CHILD]} ${PARENT_CHILD} — Gelişim Raporu</h2>
    <div class="stat-grid">
      <div class="stat-box"><div class="num">${state.lessonsDone.length}/${LESSONS.length}</div>Ders Tamamlandı</div>
      <div class="stat-box"><div class="num">${state.storiesDone.length}/${STORIES.length}</div>Hikâye</div>
      <div class="stat-box"><div class="num">${state.chessDone.length}/${CHESS_PUZZLES.length}</div>Satranç Bulmacası</div>
      <div class="stat-box"><div class="num">${state.gamesDone}</div>Oyun Oynandı</div>
      <div class="stat-box"><div class="num">${state.xp}</div>Toplam XP (Sv. ${level})</div>
      <div class="stat-box"><div class="num">${state.diamonds}</div>Elmas</div>
      <div class="stat-box"><div class="num">${state.badgesUnlocked.length}/${BADGES.length}</div>Rozet</div>
    </div>
    <div class="report-block">
      <h3>📅 Haftalık / Aylık Etkinlik</h3>
      <p>Son 7 günde <b>${weekActs.length}</b> etkinlik, son 30 günde <b>${monthActs.length}</b> etkinlik tamamlandı.</p>
    </div>
    <div class="report-block">
      <h3>🎯 Zorlandığı Kelimeler</h3>
      <div>${mistakesSorted.length ? mistakesSorted.map(([k,c])=>{
        const [en,tr] = k.split("|"); return `<span class="mistake-tag">${en} / ${tr} (${c})</span>`;
      }).join("") : "<span style='color:var(--text-soft)'>Henüz veri yok.</span>"}</div>
    </div>
    <div class="report-block">
      <h3>💪 En Güçlü Olduğu Konular</h3>
      <div>${strongLessons.length ? strongLessons.map(t=>`<span class="strong-tag">${t}</span>`).join("") : "<span style='color:var(--text-soft)'>Henüz veri yok.</span>"}</div>
    </div>
  `;
}

/* ---------------- START ---------------- */
document.addEventListener("DOMContentLoaded", init);
