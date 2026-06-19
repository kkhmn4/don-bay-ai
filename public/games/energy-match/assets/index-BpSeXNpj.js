(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor(){this.ctx=null}init(){this.ctx||=new(window.AudioContext||window.webkitAudioContext)}playFlip(){if(this.init(),!this.ctx)return;let e=this.ctx.createOscillator(),t=this.ctx.createGain();e.connect(t),t.connect(this.ctx.destination),e.type=`sine`,e.frequency.setValueAtTime(350,this.ctx.currentTime),e.frequency.exponentialRampToValueAtTime(180,this.ctx.currentTime+.12),t.gain.setValueAtTime(.08,this.ctx.currentTime),t.gain.linearRampToValueAtTime(.001,this.ctx.currentTime+.12),e.start(),e.stop(this.ctx.currentTime+.12)}playMatchCombo(e){if(this.init(),!this.ctx)return;let t=this.ctx.currentTime,n=[523.25,587.33,659.25,783.99,880,1046.5,1174.66,1318.51],r=Math.min(Math.max(0,e-1),n.length-1),i=n[r],a=n[Math.min(r+2,n.length-1)],o=this.ctx.createOscillator(),s=this.ctx.createGain();o.connect(s),s.connect(this.ctx.destination),o.type=`sine`,o.frequency.setValueAtTime(i,t),s.gain.setValueAtTime(.12,t),s.gain.exponentialRampToValueAtTime(.001,t+.15),o.start(t),o.stop(t+.15);let c=this.ctx.createOscillator(),l=this.ctx.createGain();c.connect(l),l.connect(this.ctx.destination),c.type=`sine`,c.frequency.setValueAtTime(a,t+.08),l.gain.setValueAtTime(.12,t+.08),l.gain.exponentialRampToValueAtTime(.001,t+.32),c.start(t+.08),c.stop(t+.32)}playError(){if(this.init(),!this.ctx)return;let e=this.ctx.createOscillator(),t=this.ctx.createGain();e.connect(t),t.connect(this.ctx.destination),e.type=`sawtooth`,e.frequency.setValueAtTime(180,this.ctx.currentTime),e.frequency.linearRampToValueAtTime(110,this.ctx.currentTime+.25),t.gain.setValueAtTime(.08,this.ctx.currentTime),t.gain.linearRampToValueAtTime(.001,this.ctx.currentTime+.25),e.start(),e.stop(this.ctx.currentTime+.25)}playWin(){if(this.init(),!this.ctx)return;let e=this.ctx.currentTime;[523.25,659.25,783.99,1046.5,1318.51,1567.98,2093].forEach((t,n)=>{let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.connect(i),i.connect(this.ctx.destination),r.type=`sine`,r.frequency.setValueAtTime(t,e+n*.08),i.gain.setValueAtTime(.08,e+n*.08),i.gain.exponentialRampToValueAtTime(.001,e+n*.08+.3),r.start(e+n*.08),r.stop(e+n*.08+.3)})}},t=class{constructor(t,n,r,i,a,o){this.grid=document.getElementById(t),this.hudTimer=document.getElementById(n),this.hudTurns=document.getElementById(r),this.hudProgress=document.getElementById(i),this.onMatch=a,this.onWin=o,this.sound=new e,this.cardsData=this.definePairs(),this.flippedCards=[],this.matchedPairsCount=0,this.turns=0,this.seconds=0,this.isChecking=!1,this.gameStarted=!1,this.combo=0,this.pendingMismatchCards=[],this.players=[],this.activePlayerIndex=0,this.scoreboardBar=document.getElementById(`scoreboard-bar`),this.hudActivePlayerWrapper=document.getElementById(`hud-active-player-wrapper`),this.hudActivePlayerName=document.getElementById(`hud-active-player`)}definePairs(){return[{pairId:1,category:`potential`,question:{text:`Li độ dao động điều hòa (x)`,isLaTeX:!1},answer:{text:`x = A \\cos(\\omega t + \\varphi)`,isLaTeX:!0},svg:`
          <div class="card-svg-container">
            <svg class="card-svg" viewBox="0 0 160 72">
              <line x1="20" y1="36" x2="140" y2="36" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
              <line x1="28" y1="26" x2="28" y2="46" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" />
              <line x1="80" y1="22" x2="80" y2="50" stroke="rgba(0, 242, 255, 0.5)" stroke-width="1.5" />
              <line x1="132" y1="26" x2="132" y2="46" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" />
              <text x="80" y="16" fill="rgba(0,242,255,0.5)" font-family="Montserrat" font-size="9" font-weight="600" text-anchor="middle">x=0</text>
              <circle class="svg-dot-oscillate" cx="80" cy="36" r="8" fill="#00f2ff" />
            </svg>
          </div>
        `},{pairId:2,category:`kinetic`,question:{text:`Vận tốc tức thời (v)`,isLaTeX:!1},answer:{text:`v = -A\\omega \\sin(\\omega t + \\varphi)`,isLaTeX:!0},svg:`
          <div class="card-svg-container">
            <svg class="card-svg" viewBox="0 0 160 72">
              <line x1="20" y1="36" x2="140" y2="36" stroke="rgba(255,255,255,0.1)" stroke-dasharray="3 3" stroke-width="1.5" />
              <g class="svg-dot-oscillate">
                <circle cx="80" cy="36" r="8" fill="#00f2ff" />
                <g class="svg-arrow-stretch">
                  <line x1="80" y1="36" x2="112" y2="36" stroke="#ff27e1" stroke-width="3" />
                  <polygon points="112,31 122,36 112,41" fill="#ff27e1" />
                </g>
              </g>
            </svg>
          </div>
        `},{pairId:3,category:`kinetic`,question:{text:`Công thức Động năng (Wd)`,isLaTeX:!1},answer:{text:`W_d = \\frac{1}{2}mv^2`,isLaTeX:!0},svg:`
          <div class="card-svg-container">
            <svg class="card-svg" viewBox="0 0 160 72">
              <line class="svg-motion-line" x1="18" y1="24" x2="52" y2="24" stroke="#00f2ff" stroke-width="2" style="animation-delay: -0.3s;"/>
              <line class="svg-motion-line" x1="8" y1="36" x2="50" y2="36" stroke="#00f2ff" stroke-width="3" />
              <line class="svg-motion-line" x1="14" y1="48" x2="44" y2="48" stroke="#00f2ff" stroke-width="2" style="animation-delay: -0.6s;"/>
              <rect x="80" y="18" width="36" height="36" rx="5" fill="#051424" stroke="#00f2ff" stroke-width="2" />
              <text x="98" y="41" fill="#00f2ff" font-family="Montserrat" font-weight="700" font-size="16" text-anchor="middle">m</text>
            </svg>
          </div>
        `},{pairId:4,category:`potential`,question:{text:`Công thức Thế năng (Wt)`,isLaTeX:!1},answer:{text:`W_t = \\frac{1}{2}kx^2`,isLaTeX:!0},svg:`
          <div class="card-svg-container">
            <svg class="card-svg" viewBox="0 0 160 72">
              <!-- Fixed wall -->
              <line x1="8" y1="10" x2="8" y2="62" stroke="rgba(255,255,255,0.5)" stroke-width="4"/>
              <!-- Spring coil: scaleX anchored at wall x=8 -->
              <g class="svg-spring" style="transform-origin: 8px 36px">
                <path d="M 8 36 L 16 36 L 22 22 L 32 50 L 42 22 L 52 50 L 62 22 L 72 50 L 82 22 L 90 36 L 98 36"
                      fill="none" stroke="#ff27e1" stroke-width="3" stroke-linejoin="round"/>
              </g>
              <!-- Mass block: slides in sync with spring endpoint -->
              <rect class="svg-spring-mass" x="98" y="22" width="28" height="28" rx="4" fill="#051424" stroke="#ff27e1" stroke-width="2.5"/>
            </svg>
          </div>
        `},{pairId:5,category:`kinetic`,question:{text:`Khi động năng đạt cực đại`,isLaTeX:!1},answer:{text:`Thế năng cực tiểu`,isLaTeX:!1},svg:`
          <div class="card-svg-container">
            <svg class="card-svg" viewBox="0 0 160 80">
              <!-- Pivot point marker -->
              <circle cx="80" cy="4" r="3" fill="rgba(255,255,255,0.35)"/>
              <!-- Pendulum group: rotates around pivot (80, 4) -->
              <g class="svg-pendulum" style="transform-origin: 80px 4px">
                <line x1="80" y1="4" x2="80" y2="48" stroke="rgba(255,255,255,0.45)" stroke-width="2.5"/>
                <circle cx="80" cy="56" r="10" fill="#00f2ff"/>
              </g>
              <!-- Equilibrium flash ellipse (Wt = 0 at center) -->
              <ellipse class="svg-flash-vtcb" cx="80" cy="64" rx="24" ry="6" fill="none" stroke="#00f2ff" stroke-width="2"/>
              <text x="80" y="76" fill="rgba(0,242,255,0.6)" font-family="Montserrat" font-size="8" font-weight="600" text-anchor="middle">Wt min</text>
            </svg>
          </div>
        `},{pairId:6,category:`potential`,question:{text:`Khi động năng đạt cực tiểu`,isLaTeX:!1},answer:{text:`Thế năng cực đại`,isLaTeX:!1},svg:`
          <div class="card-svg-container">
            <svg class="card-svg" viewBox="0 0 160 72">
              <line x1="20" y1="36" x2="140" y2="36" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
              <circle class="svg-flash-bound" cx="28" cy="36" r="13" fill="none" stroke="#ff27e1" stroke-width="2"/>
              <circle class="svg-flash-bound" cx="132" cy="36" r="13" fill="none" stroke="#ff27e1" stroke-width="2"/>
              <circle class="svg-dot-oscillate" cx="80" cy="36" r="7" fill="#ff27e1"/>
              <text x="28" y="20" fill="rgba(255,39,225,0.6)" font-family="Montserrat" font-size="8" font-weight="600" text-anchor="middle">-A</text>
              <text x="132" y="20" fill="rgba(255,39,225,0.6)" font-family="Montserrat" font-size="8" font-weight="600" text-anchor="middle">+A</text>
            </svg>
          </div>
        `},{pairId:7,category:`kinetic`,question:{text:`Khi động năng tăng`,isLaTeX:!1},answer:{text:`Thế năng giảm`,isLaTeX:!1},svg:`
          <div class="card-svg-container">
            <svg class="card-svg" viewBox="0 0 160 72">
              <g transform="translate(44, 36)">
                <line x1="0" y1="16" x2="0" y2="-16" stroke="#00f2ff" stroke-width="3.5"/>
                <polygon points="0,-16 -5,-6 5,-6" fill="#00f2ff"/>
                <text x="10" y="5" fill="#00f2ff" font-family="Montserrat" font-size="14" font-weight="700">Wd</text>
              </g>
              <g transform="translate(104, 36)">
                <line x1="0" y1="-16" x2="0" y2="16" stroke="#ff27e1" stroke-width="3.5"/>
                <polygon points="0,16 -5,6 5,6" fill="#ff27e1"/>
                <text x="10" y="5" fill="#ff27e1" font-family="Montserrat" font-size="14" font-weight="700">Wt</text>
              </g>
            </svg>
          </div>
        `},{pairId:8,category:`potential`,question:{text:`Khi động năng giảm`,isLaTeX:!1},answer:{text:`Thế năng tăng`,isLaTeX:!1},svg:`
          <div class="card-svg-container">
            <svg class="card-svg" viewBox="0 0 160 72">
              <g transform="translate(44, 36)">
                <line x1="0" y1="-16" x2="0" y2="16" stroke="#00f2ff" stroke-width="3.5"/>
                <polygon points="0,16 -5,6 5,6" fill="#00f2ff"/>
                <text x="10" y="5" fill="#00f2ff" font-family="Montserrat" font-size="14" font-weight="700">Wd</text>
              </g>
              <g transform="translate(104, 36)">
                <line x1="0" y1="16" x2="0" y2="-16" stroke="#ff27e1" stroke-width="3.5"/>
                <polygon points="0,-16 -5,-6 5,-6" fill="#ff27e1"/>
                <text x="10" y="5" fill="#ff27e1" font-family="Montserrat" font-size="14" font-weight="700">Wt</text>
              </g>
            </svg>
          </div>
        `},{pairId:9,category:`kinetic`,question:{text:`Cơ năng luôn không đổi bằng`,isLaTeX:!1},answer:{text:`Tổng động năng và thế năng`,isLaTeX:!1},svg:`
          <div class="card-svg-container">
            <svg class="card-svg" viewBox="0 0 160 72">
              <rect x="36" y="16" width="14" height="40" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
              <rect x="36" y="16" width="14" height="40" fill="url(#gradW2)"/>
              <text x="24" y="40" fill="#00f2ff" font-family="Montserrat" font-size="13" font-weight="700" text-anchor="middle">W</text>
              <text x="78" y="40" fill="#fff" font-family="Montserrat" font-size="18" font-weight="700" text-anchor="middle">=</text>
              <rect x="102" y="16" width="14" height="16" fill="#00f2ff"/>
              <rect x="102" y="32" width="14" height="24" fill="#ff27e1"/>
              <rect x="102" y="16" width="14" height="40" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
              <text x="120" y="28" fill="#00f2ff" font-family="Montserrat" font-size="9" font-weight="700">Wd</text>
              <text x="120" y="46" fill="#ff27e1" font-family="Montserrat" font-size="9" font-weight="700">Wt</text>
              <defs>
                <linearGradient id="gradW2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#00f2ff"/>
                  <stop offset="100%" stop-color="#ff27e1"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        `}]}initGame(e){this.resetState(),e&&e.length>0?this.players=e.map(e=>({name:e.trim().toUpperCase(),score:0})):this.players=[{name:`NGƯỜI CHƠI 1`,score:0}],this.activePlayerIndex=0,this.renderScoreboard(),this.updateActivePlayerHUD(),this.hudActivePlayerWrapper&&(this.hudActivePlayerWrapper.style.display=`flex`);let t=[];this.cardsData.forEach(e=>{t.push({pairId:e.pairId,category:e.category,role:`question`,text:e.question.text,isLaTeX:e.question.isLaTeX,svg:e.svg}),t.push({pairId:e.pairId,category:e.category,role:`answer`,text:e.answer.text,isLaTeX:e.answer.isLaTeX,svg:e.svg})}),this.shuffle(t),this.renderCards(t),this.renderLaTeX(),this.renderLeaderboard()}resetState(){this.flippedCards=[],this.matchedPairsCount=0,this.turns=0,this.seconds=0,this.isChecking=!1,this.gameStarted=!1,this.combo=0,this.pendingMismatchCards=[],this.timerInterval&&clearInterval(this.timerInterval),this.hudTimer&&(this.hudTimer.textContent=`00:00`),this.hudTurns&&(this.hudTurns.textContent=`LƯỢT LẬT: 0`),this.hudProgress&&(this.hudProgress.textContent=`0 / 9 CẶP`),this.hudActivePlayerWrapper&&(this.hudActivePlayerWrapper.style.display=`none`);let e=document.getElementById(`leaderboard-input-block`);e&&e.classList.add(`hidden`)}renderScoreboard(){this.scoreboardBar&&(this.scoreboardBar.innerHTML=``,this.players.forEach((e,t)=>{let n=t===this.activePlayerIndex,r=document.createElement(`div`);r.className=`scoreboard-item ${n?`active`:``}`,r.innerHTML=`
        <span class="player-name-lbl">${e.name}</span>
        <span class="player-score-lbl">${e.score}</span>
      `,this.scoreboardBar.appendChild(r)}))}updateActivePlayerHUD(){this.hudActivePlayerName&&this.players.length>0&&this.players[this.activePlayerIndex]&&(this.hudActivePlayerName.textContent=`LƯỢT: ${this.players[this.activePlayerIndex].name}`)}shuffle(e){for(let t=e.length-1;t>0;t--){let n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}}renderCards(e){this.grid&&(this.grid.innerHTML=``,e.forEach(e=>{let t=document.createElement(`div`);t.className=`card relative rounded-xl cursor-pointer select-none`,t.dataset.pairId=e.pairId,t.dataset.role=e.role,t.dataset.category=e.category,t.innerHTML=`
        <div class="card-inner absolute inset-0 w-full h-full transition-transform duration-500 rounded-xl">
          <!-- Back Side (Face Down) -->
          <div class="card-back absolute inset-0 w-full h-full rounded-xl glass-panel flex flex-col items-center justify-center border border-white/10 hover:border-white/20 transition-colors">
            <span class="material-symbols-outlined text-3xl opacity-40">psychology</span>
            <span class="text-[9px] uppercase tracking-wider font-label-mono mt-1 opacity-30">${e.role===`question`?`Khái niệm`:`Công thức`}</span>
          </div>
          <!-- Front Side (Face Up) -->
          <div class="card-front absolute inset-0 w-full h-full rounded-xl flex flex-col items-center justify-center p-2 text-center border overflow-hidden ${e.role===`question`?`bg-surface-container-high border-primary-container/30 shadow-[inset_0_0_12px_rgba(0,242,255,0.05)]`:`bg-surface-container-highest border-secondary-container/30 shadow-[inset_0_0_12px_rgba(255,39,225,0.05)]`}">
            <div class="card-text ${e.role===`question`?`text-primary-fixed-dim`:`text-secondary-fixed-dim`}" data-latex="${e.isLaTeX}" style="flex: 1; display: flex; align-items: center; justify-content: center; width: 100%;">${e.text}</div>
            ${e.svg?e.svg:``}
          </div>
        </div>
      `,t.addEventListener(`click`,e=>this.handleCardClick(t,e)),this.grid.appendChild(t)}))}handleCardClick(e,t){this.pendingMismatchCards.length===2&&this.closeMismatchedCards(),!(this.isChecking||e.classList.contains(`flipped`)||e.classList.contains(`matched`))&&(this.sound.playFlip(),this.gameStarted||(this.gameStarted=!0,this.startTimer()),e.classList.add(`flipped`),this.flippedCards.push(e),this.flippedCards.length===2&&(this.turns++,this.hudTurns&&(this.hudTurns.textContent=`LU\u1ee2T L\u1eacT: ${this.turns}`),this.checkMatch(t)))}closeMismatchedCards(){let[e,t]=this.pendingMismatchCards;e&&(e.classList.remove(`flipped`,`mismatch-open`),e.querySelector(`.card-front`).style.borderColor=``),t&&(t.classList.remove(`flipped`,`mismatch-open`),t.querySelector(`.card-front`).style.borderColor=``),this.pendingMismatchCards=[]}checkMatch(e){this.isChecking=!0;let[t,n]=this.flippedCards,r=t.dataset.pairId===n.dataset.pairId,i=t.dataset.role!==n.dataset.role;r&&i?(this.combo++,this.players[this.activePlayerIndex]&&this.players[this.activePlayerIndex].score++,this.combo>=2&&this.showFloatingCombo(n,this.combo),setTimeout(()=>{t.classList.add(`matched`),n.classList.add(`matched`);let e=t.dataset.category,r=e===`kinetic`?`neon-border-primary`:`neon-border-secondary`;t.querySelector(`.card-front`).classList.add(r),n.querySelector(`.card-front`).classList.add(r),this.combo>=2&&(t.querySelector(`.card-front`).classList.add(`combo-glow`),n.querySelector(`.card-front`).classList.add(`combo-glow`)),this.sound.playMatchCombo(this.combo),this.matchedPairsCount++,this.hudProgress&&(this.hudProgress.textContent=`${this.matchedPairsCount} / 9 C\u1eb6P`),this.renderScoreboard(),this.updateActivePlayerHUD(),this.onMatch&&this.onMatch(e),this.flippedCards=[],this.isChecking=!1,this.matchedPairsCount===9&&this.handleWin()},400)):(this.combo=0,setTimeout(()=>{t.querySelector(`.card-front`).style.borderColor=`rgba(239, 68, 68, 0.7)`,n.querySelector(`.card-front`).style.borderColor=`rgba(239, 68, 68, 0.7)`,t.classList.add(`mismatch-open`),n.classList.add(`mismatch-open`),this.sound.playError(),this.pendingMismatchCards=[t,n],this.flippedCards=[],this.isChecking=!1,this.activePlayerIndex=(this.activePlayerIndex+1)%this.players.length,this.renderScoreboard(),this.updateActivePlayerHUD()},300))}showFloatingCombo(e,t){let n=e.getBoundingClientRect(),r=n.left+n.width/2,i=n.top-20,a=document.createElement(`div`);a.className=`floating-combo`,a.style.left=`${r}px`,a.style.top=`${i}px`,a.textContent=`COMBO x${t}! 🔥`,document.body.appendChild(a),setTimeout(()=>{a.remove()},1200)}startTimer(){this.seconds=0,this.timerInterval=setInterval(()=>{this.seconds++;let e=String(Math.floor(this.seconds/60)).padStart(2,`0`),t=String(this.seconds%60).padStart(2,`0`);this.hudTimer&&(this.hudTimer.textContent=`${e}:${t}`)},1e3)}handleWin(){clearInterval(this.timerInterval),this.sound.playWin();let e=Math.max(...this.players.map(e=>e.score)),t=this.players.filter(t=>t.score===e),n=``;n=this.players.length===1?`Bạn đã ghép đúng tất cả các công thức trong ${this.seconds} giây và ${this.turns} lượt lật!`:t.length===1?`Chúc mừng ${t[0].name} đã giành CHIẾN THẮNG với ${e} điểm!`:`HÒA NHAU! ${t.map(e=>e.name).join(` & `)} cùng đạt ${e} điểm!`;let r=document.getElementById(`win-message`);r&&(r.textContent=n);let i=this.checkLeaderboardEligibility(this.seconds,this.turns),a=document.getElementById(`leaderboard-input-block`),o=document.getElementById(`player-name-input`);i&&a?(a.classList.remove(`hidden`),o&&t.length>0&&(o.value=t[0].name)):a&&a.classList.add(`hidden`),this.onWin&&this.onWin(this.turns,this.seconds)}renderLaTeX(){window.katex&&document.querySelectorAll(`.card-text[data-latex="true"]`).forEach(e=>{let t=e.textContent.replace(/\$\$/g,``).replace(/\$/g,``);try{window.katex.render(t,e,{throwOnError:!1,displayMode:!1})}catch(e){console.error(`KaTeX render error: `,e)}})}loadLeaderboard(){try{let e=localStorage.getItem(`energyMatchLeaderboard`);return e?JSON.parse(e):[]}catch(e){return console.error(`Failed to load leaderboard: `,e),[]}}saveLeaderboard(e){try{localStorage.setItem(`energyMatchLeaderboard`,JSON.stringify(e))}catch(e){console.error(`Failed to save leaderboard: `,e)}}checkLeaderboardEligibility(e,t){let n=this.loadLeaderboard();if(n.length<5)return!0;let r=n[n.length-1];return e<r.time||e===r.time&&t<r.turns}addRecord(e,t,n){let r=this.loadLeaderboard();r.push({name:e.trim().toUpperCase(),time:t,turns:n,date:new Date().toLocaleDateString()}),r.sort((e,t)=>e.time===t.time?e.turns-t.turns:e.time-t.time),r=r.slice(0,5),this.saveLeaderboard(r);let i=r.findIndex(r=>r.name===e.trim().toUpperCase()&&r.time===t&&r.turns===n);this.renderLeaderboard(i)}renderLeaderboard(e=-1){let t=document.getElementById(`leaderboard-list`);if(!t)return;t.innerHTML=``;let n=this.loadLeaderboard();if(n.length===0){t.innerHTML=`<div class="text-variant text-sm text-center" style="opacity: 0.5; padding: 10px 0;">Chưa có kỷ lục nào được ghi nhận</div>`;return}n.forEach((n,r)=>{let i=String(Math.floor(n.time/60)).padStart(2,`0`),a=String(n.time%60).padStart(2,`0`),o=document.createElement(`div`);o.className=`leaderboard-entry ${r===e?`highlight`:``}`,o.innerHTML=`
        <div>
          <span class="rank-number">#${r+1}</span>
          <span class="player-name">${n.name}</span>
        </div>
        <div class="text-variant">
          <span>${i}:${a}</span>
          <span style="margin-left: 8px; opacity: 0.7;">(${n.turns} lượt)</span>
        </div>
      `,t.appendChild(o)})}};document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`restart-btn`),n=document.getElementById(`modal-restart-btn`),r=document.getElementById(`win-modal`),i=document.getElementById(`win-time`),a=document.getElementById(`win-turns`),o=document.getElementById(`win-rank`),s=document.getElementById(`submit-score-btn`),c=document.getElementById(`player-name-input`),l=document.getElementById(`leaderboard-input-block`),u=document.getElementById(`player-setup-screen`),d=document.getElementById(`game-screen`),f=document.getElementById(`player-setup-form`),p=document.getElementById(`add-player-btn`),m=document.getElementById(`remove-player-btn`),h=document.getElementById(`player-inputs-list`),g=document.getElementById(`fullscreen-btn`),_=document.getElementById(`fullscreen-icon`),v=0,y=0,b=new t(`card-grid`,`hud-timer`,`hud-turns`,`hud-progress`,e=>{},(e,t)=>{y=e,v=t,i.textContent=`${String(Math.floor(t/60)).padStart(2,`0`)}:${String(t%60).padStart(2,`0`)}`,a.textContent=e;let n=`Tập Sự Vật Lí 📚`;e<=8&&t<=20?n=`Thiên Tài Vật Lí 🌌`:e<=11&&t<=40?n=`Học Sinh Ưu Tú 🏆`:e<=15&&t<=80&&(n=`Học Sinh Chăm Chỉ ⚡`),o.textContent=n,r.classList.remove(`hidden`)}),x=()=>{document.querySelectorAll(`.card`).forEach(e=>{e.addEventListener(`mousemove`,t=>{if(e.classList.contains(`matched`)||e.classList.contains(`flipped`)){e.style.transform=``;return}let n=e.getBoundingClientRect(),r=t.clientX-n.left-n.width/2,i=-((t.clientY-n.top-n.height/2)/(n.height/2))*10,a=r/(n.width/2)*10;e.style.transform=`perspective(800px) rotateX(${i}deg) rotateY(${a}deg) scale(1.04)`}),e.addEventListener(`mouseleave`,()=>{e.style.transform=``}),e.addEventListener(`click`,()=>{e.style.transform=``})})};p.addEventListener(`click`,()=>{let e=h.querySelectorAll(`.player-input-row`);if(e.length>=4)return;let t=e.length+1,n=`ABCDEFGHIJKLMNOPQRSTUVWXYZ`[e.length]||t,r=document.createElement(`div`);r.className=`player-input-row`,r.innerHTML=`
      <span class="player-number">#${t}</span>
      <input type="text" class="player-name-field" required placeholder="TÊN NGƯỜI CHƠI ${t}" value="ĐỘI ${n}">
    `,h.appendChild(r)}),m.addEventListener(`click`,()=>{let e=h.querySelectorAll(`.player-input-row`);e.length<=1||e[e.length-1].remove()}),f.addEventListener(`submit`,t=>{t.preventDefault();let n=h.querySelectorAll(`.player-name-field`),r=Array.from(n).map(e=>e.value.trim()).filter(Boolean);if(r.length===0){alert(`Vui lòng nhập ít nhất một người chơi!`);return}u.classList.add(`hidden`),d.classList.remove(`hidden`);let i=document.getElementById(`game-info-screen`),a=document.getElementById(`hud-active-player-wrapper`);i&&i.classList.remove(`hidden`),a&&(a.style.display=`flex`),e&&(e.style.display=`flex`),b.initGame(r),x()});let S=()=>{r.classList.add(`hidden`),c.value=``,u.classList.remove(`hidden`),d.classList.add(`hidden`);let t=document.getElementById(`game-info-screen`),n=document.getElementById(`hud-active-player-wrapper`);t&&t.classList.add(`hidden`),n&&(n.style.display=`none`),e&&(e.style.display=`none`),b.resetState()};e.addEventListener(`click`,S),n.addEventListener(`click`,S),s.addEventListener(`click`,()=>{let e=c.value.trim();if(!e){alert(`Vui lòng nhập tên để lưu điểm!`);return}b.addRecord(e,v,y),l.classList.add(`hidden`),c.value=``}),c.addEventListener(`keydown`,e=>{e.key===`Enter`&&s.click()}),g.addEventListener(`click`,()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(e=>{console.error(`Error attempting to enable full-screen mode: ${e.message} (${e.name})`)})}),document.addEventListener(`fullscreenchange`,()=>{document.fullscreenElement?_.textContent=`fullscreen_exit`:_.textContent=`fullscreen`})});