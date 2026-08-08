# Ghost Link — 컨셉 전달 개선 설계안

> 목표: 방문자가 **3초 안에 이게 뭔지 이해**하고, **누군가에게 감정이입**하고,
> **이 미래에 대해 논쟁하고 싶어지게** 만든다. 그 결과가 스타와 기여다.

작성일: 2026-08-08 · 대상 커밋: `f3c84d4`

---

## 1. 진단

### 1.1 README와 앱이 서로 다른 것을 주장한다 (최대 문제)

| | 톤 | 주장 |
|---|---|---|
| `README.md` | 사변적 실험, "collective hallucination", 놀이터 | "기술은 아직 없다. 우리는 인터페이스를 먼저 만든다" |
| `app/layout.tsx` 메타데이터 / 랜딩 | 실제 상용 제품 | "The world's **first** decentralized... earn **real-time crypto yields**" |

방문자는 랜딩에서 "$42.8M 지급", "크립토 수익", "지금 벌기 시작"을 먼저 봅니다.
README를 읽기 전에는 이게 픽션이라는 신호가 **어디에도 없습니다.**
→ 공감이 아니라 **스캠 경계심**이 먼저 발생하고, 그 상태에서는 어떤 카피도 작동하지 않습니다.

### 1.2 숫자만 있고 사람이 없다

전체가 "인간"에 관한 프로젝트인데 사이트 어디에도 사람이 없습니다.
`$42.8M` · `99.98%` · `45.2 CRED/HR` — 아무도 이 숫자에 감정이입하지 못합니다.
카피도 전부 기계어입니다: "Edge-Sync Protocol", "Yield Optimization", "Tactile Telepresence".

### 1.3 갈등이 없다 = 논쟁이 없다 = 공유할 이유가 없다

README는 "debate how that future looks"라고 하지만, 앱은 100% 유토피아 광고입니다.
이 컨셉의 진짜 힘은 **양가성**에 있습니다 —
마닐라의 누군가가 이주 없이 6배 임금을 버는 이야기이자,
로테르담의 누군가가 일자리를 잃는 이야기.
지금은 후자가 통째로 빠져 있어서 밋밋합니다.

### 1.4 핵심 개념(텔레프레즌스)이 설명될 뿐 체험되지 않는다

"12ms 지연"은 숫자로만 존재합니다.
**지구 반대편의 몸을 빌린다**는 감각이 전달되는 순간이 사이트에 단 한 번도 없습니다.

### 1.5 세계관 균열 (신뢰도 손실)

| 위치 | 문제 |
|---|---|
| `how-to/page.tsx:102` | 보상 토큰이 `$GHOST` — 나머지 전부는 `CRED`. 화폐 단위가 두 개 |
| `contributors/page.tsx` | 팔레트가 `#1337ec/#00f3ff/#bc00ff/#050505` — 디자인 시스템(`#00e5ff/#080c14`) 완전 이탈 |
| `how-to/page.tsx` CTA | "Request System Demo" / "Become an Operator" — 핸들러 없는 죽은 버튼 |
| `contributors/page.tsx` | 가짜 컨트리뷰터(`@Xenon_01` 등 + Google CDN 아바타)가 실제 기여 유인을 잡아먹음 |
| `page.tsx:125` | `<div className="flex flex-col ...">` — 리터럴 `...` 클래스 잔해 |
| `page.tsx:60` | `counter` state가 50ms마다 갱신되지만 **어디에도 안 쓰임** → 초당 20회 전체 리렌더 |
| `page.tsx:110` | `<h1>` 안에 문단 5개 — SEO/접근성 붕괴 |
| `vr/page.tsx` | 데스크톱 전용(`w-[400px]` 고정 PIP, 좌우 절대배치 패널) — 컨셉의 핵심 화면인데 모바일에서 깨짐 |
| `globals.css` | `animate-fade-in-up`, `animate-cinematic-pan`, `animate-spin-slow` 클래스가 정의되지 않음 (무동작) |

### 1.6 구현 중 발견된 추가 버그 (P0에서 처리/기록)

**(a) Tailwind 여백 유틸리티가 전부 죽어 있다 — 프로젝트 전역**

`globals.css`의 리셋이 **레이어 밖**에 있다:

```css
* { box-sizing: border-box; margin: 0; padding: 0; }
```

Tailwind v4는 모든 유틸리티를 `@layer`에 넣는데, CSS 캐스케이드 규칙상
**언레이어드 선언이 레이어드 선언을 항상 이긴다.** 따라서 `px-4`, `p-6`, `py-2` 등
모든 패딩/마진 유틸리티가 무시된다. 이것이 이 코드베이스가 인라인 스타일에
과도하게 의존하게 된 근본 원인으로 보인다 (특히 `contributors` 페이지 레이아웃이
설계 의도대로 렌더되지 않음).

> **[해결됨]** 리셋을 `@layer base`로 이동. 전 페이지(9개)를 데스크톱·모바일에서
> 전후 비교했고, 회귀는 `/vr` 한 곳뿐이었다 — 아래 §1.6c 참조.

**(b) 고정 오버레이가 Navbar 안에 갇힌다**

`Navbar`는 `backdrop-filter: blur(12px)`를 쓴다. backdrop-filter는 **하위
`position: fixed` 요소의 컨테이닝 블록**이 되므로, Navbar 내부에서 렌더된
전체화면 모달이 Navbar 박스에 클리핑된다. `SimFrame` 모달은 `createPortal`로
`document.body`에 렌더해서 해결. 앞으로 Navbar 안에서 오버레이를 띄울 때 동일 주의.

**(c) `@layer base` 이전 후 `/vr`에서 발생한 회귀와 처리**

여백 유틸리티가 되살아나자 `/vr`의 HUD 패널들이 실제 패딩을 갖게 되면서
햅틱 컬럼(높이 294px)이 PIP 피드와 겹쳤다. 처리:

- 데스크톱: 햅틱 컬럼을 `top: 150px`에 고정하고 바 높이를 130px로 축소
- 모바일: `top: 150px`, 바 64px. 세로 720px 미만 화면에서는 **햅틱 컬럼을 숨김**
  (비상정지 버튼이 우선)
- `-translate-y-1/2` 클래스는 CSS로 상쇄하지 말고 **마크업에서 제거**했다.
  Tailwind v4는 개별 `translate` 속성으로 중앙 정렬하므로 `transform: none`으로는
  취소되지 않는다 (`translate: none !important`도 이 조합에서는 적용되지 않았다).

**(d) `/vr` FPV 카메라가 로봇 자신을 보고 있었다 — 해결됨**

FPV 카메라는 `[0, 1.8, 0.4]`, 즉 로봇 머리 안쪽에 있다. 그 시야에 가슴의
`Glowing Core`(`emissive` 강도 2, `toneMapped={false}`)가 정면으로 들어와
화면 중앙이 통째로 청록색으로 채워지고 있었다. FPV 모드에서 몸통·머리 그룹을
렌더하지 않도록 변경 — 이제 작업대와 그리퍼가 보인다. 팔은 그대로 유지.

---

## 2. 전략 — 3개 축

> **축 1. 픽션임을 당당히 선언한다** → 신뢰 회복, 역설적으로 몰입 상승
> **축 2. 숫자를 사람으로 바꾼다** → 공감의 유일한 경로
> **축 3. 양가성을 UI로 만든다** → 논쟁 = 공유 = 스타

---

## 3. P0 — 개념 전달 즉효

### ① 시뮬레이션 프레임 배지 `components/SimFrame.tsx`

전 페이지 최상단 얇은 띠 + 클릭 시 모달.

```
▸ SPECULATIVE PROTOTYPE · YEAR 2041 · ALL DATA SIMULATED     [ WHAT IS THIS? ]
```

모달: "이 사이트는 아직 존재하지 않는 직업의 대시보드입니다.
회사도, 토큰도, 로봇도 없습니다. 우리가 만드는 건 **인터페이스**입니다 —
그날이 왔을 때 표준이 되도록." + GitHub CTA.

> 역효과처럼 보이지만 반대다. "가짜"라고 먼저 밝히면 방문자는 의심을 멈추고
> **세계관에 참여**하기 시작한다. 지금은 의심하느라 참여를 못 한다.

**구현 메모**: 띠 높이 28px. `Navbar`가 `position:fixed; top:0`이므로 띠를 Navbar
내부 최상단에 렌더하고, `--nav-h` CSS 변수(88px)를 도입해 각 페이지의
하드코딩된 `paddingTop: '60px'`를 대체한다.

### ② 방문자에게 오퍼레이터 신분 부여 `components/OperatorIdentity.tsx`

첫 방문 시 3초 부팅 시퀀스 → `localStorage` 저장.

```
ESTABLISHING NEURAL LINK ......... OK
CALIBRATING HAPTIC PROFILE ....... OK
> OPERATOR ID ASSIGNED: OP-7241
> WELCOME BACK, GHOST.
```

이후 Navbar 우측이 죽은 `Connect Wallet` 대신 `OP-7241 · 12ms · OPTIMAL`로 바뀐다.

> 비용 거의 0, 소속감 효과 최대. 방문자가 **관찰자에서 등장인물**이 된다.

### ③ 히어로를 "설명"에서 "체험"으로 `app/page.tsx`

현재 히어로는 `<h1>` 안에 README 문장을 통째로 복붙한 텍스트 벽이다.

- **인터랙티브 지연 데모**: 포인터/터치를 따라 로봇 그리퍼가 **정확히 지연만큼 늦게** 따라옴.
  캡션 — *"당신의 손은 여기. 그리퍼는 로테르담. 차이는 12ms."*
  → 텔레프레즌스를 3초 만에 몸으로 이해시킴
- 카피 축약: `HUMAN-ROBOT LABOR PLATFORM` → **`RENT OUT YOUR HANDS.`**
  서브: *"Somewhere on Earth, a body is waiting for someone to think for it."*
- `<h1>`은 한 줄만, 나머지는 `<p>`로 (SEO/a11y 복구)
- 죽은 `counter` interval 제거, `...` 잔해 div 제거, 누락된 애니메이션 정의 추가

### ④ 통계 바에 인간 단위 추가

```diff
- { label: 'Avg Hourly Rate', value: '45.2 CRED', sub: '≈ $12.40 USD' }
+ { label: 'Avg Hourly Rate', value: '45.2 CRED', sub: '≈ 6.2× Manila median wage' }
+ { label: 'Hands Rented Today', value: '31,204', sub: 'across 94 countries' }
+ { label: 'Longest Link', value: '11,840 km', sub: 'Lagos → Reykjavík' }
```

### ⑤ 세계관 통일

- `$GHOST` → `CRED` (`how-to/page.tsx:102`)
- `contributors/page.tsx` 팔레트를 디자인 시스템으로 정렬
  (`#1337ec`→`#00e5ff`, `#050505`→`#080c14`, `#bc00ff`→`#a855f7`, `#0bda65`→`#10b981`)
- `layout.tsx` 메타데이터를 픽션 프레임에 맞게:
  *"Ghost Link — the interface for a job that doesn't exist yet."*

---

## 4. P1 — 공감 엔진

### ⑥ Job 카드 → Operator 카드 (핵심 전환)

지금 `liveJobs`는 스펙 시트다. 여기에 **사람을 붙인다**:

```
● NOW PILOTING                                          #ARB-0822
┌───────────────────────────────────────────────────────────────┐
│  ◐ MARIA R. · 34 · Quezon City          DEXTERITY-X1 / Osaka  │
│  "딸이 옆방에서 자고 있어요. 저는 지금 오사카에서              │
│   위성 부품을 조립하는 중입니다."                              │
│  오늘 수익 412 CRED · 링크 유지 4h 12m · 지연 12ms            │
└───────────────────────────────────────────────────────────────┘
```

같은 데이터, 완전히 다른 감정. 랜딩 "Live Marketplace" 섹션과 `/marketplace` 상단.

### ⑦ `/story` — 오퍼레이터의 하루 (신규 페이지)

스크롤 내러티브.
06:40 알람 → 07:02 링크 접속 → 09:30 알래스카 파이프라인 → 12:00 헤드셋 벗고 점심 →
15:00 하자 발생, 등급 하락 경고 → 21:00 로그아웃, 손이 떨림.

> 컨셉을 기능 목록이 아니라 **삶**으로 전달. 이 페이지 하나가 나머지 7개 페이지보다
> 공감을 많이 만든다.

### ⑧ Utopia ↔ Dystopia 토글 (공유 유발 장치)

랜딩 하단 스위치 하나. 동일한 통계가 관점에 따라 반전된다.

| 지표 | 🌱 UTOPIA | 🕳 DYSTOPIA |
|---|---|---|
| 45.2 CRED/hr | 마리아는 이주 없이 지역 임금의 6배를 번다 | 로테르담 현장 노동자 임금의 22%. 그는 작년에 해고됐다 |
| 99.98% uptime | 인간은 이제 위험한 곳에서 죽지 않는다 | 인간은 이제 24시간 교대 가능한 API가 되었다 |
| 12ms 지연 | 거리가 사라졌다 | 사라진 건 국경이 아니라 임금 하한선이다 |
| RLHF 학습 | 로봇이 배울수록 인간은 더 안전해진다 | 로봇이 배울수록 당신의 일감은 줄어든다 |

> README의 "debate the future"를 처음으로 UI가 실행한다.
> 스크린샷이 인용·공유되는 지점이 여기다.

### ⑨ `/vr` 온보딩 + 모바일 대응

- 첫 진입 시 순차 하이라이트 4단계:
  *"이건 당신의 손입니다" → "이 막대는 촉감입니다" →
  "이 지연은 지구 반대편까지의 거리입니다" → "빨간 버튼은 진짜 멈춥니다"*
- 모바일: 좌우 햅틱 패널 → 하단 가로 배치, PIP `w-[400px]` → `w-full max-w-[400px]`,
  하단 컨트롤 세로 스택
- 지금은 화려하지만 **뭘 보는지 모르는 화면**이다. 설명 한 줄이 붙는 순간
  컨셉 전달의 최강 자산이 된다.

---

## 5. P2 — 기여 전환

### ⑩ Contributors 실데이터화
가짜 4명 → GitHub API 실제 컨트리뷰터.
헤드라인: **"Architects of a job that doesn't exist yet."**
각 카드에 머지된 PR 제목을 세계관 톤으로 표시.
실존 인물이 보이는 순간 "나도 이름을 올릴 수 있다"가 된다.

### ⑪ 기여 진입로
- 전역 푸터에 `[ 이 미래를 포크하세요 ]` — 죽은 "Request System Demo" 대체
- `.github/ISSUE_TEMPLATE/roleplay.yml` — 2041년 버그 리포트 양식
  (필드: 발생 연도 / 오퍼레이터 ID / 로봇 모델 / 지연값)
  → README의 "Roleplay Issues"를 실제로 실행 가능하게
- `CONTRIBUTING.md`: "5분 안에 기여하기 — 페이지 하나 열고, AI에게 시키고, PR"

### ⑫ README 개편
현재 README는 컨셉 선언은 훌륭하나 **앱을 보여주지 않는다**.
추가: 스크린샷 3장(랜딩/VR/스토리), 라이브 링크 상단, `pnpm dev` 실행법(현재 없음),
톤을 랜딩과 일치.

---

## 6. 실행 순서

```
P0 ①②③④⑤  →  "이게 뭔지 3초 안에 이해되고, 나는 OP-7241이다"
P1 ⑥⑦⑧⑨    →  "마리아가 신경 쓰이고, 이 미래가 무섭기도 하다"
P2 ⑩⑪⑫      →  "내 이름도 여기 올리고 싶다"
```

**임팩트/노력 비율 최상위 3개**: ① 시뮬레이션 프레임 · ② 오퍼레이터 ID · ⑧ 유토피아/디스토피아 토글.
셋 다 반나절씩이고, 셋 다 지금 없는 감정을 새로 만든다.

---

## 7. 진행 상태

- [x] P0 ① 시뮬레이션 프레임 배지
- [x] P0 ② 오퍼레이터 신분 부여
- [x] P0 ③ 히어로 지연 체험
- [x] P0 ④ 인간 단위 통계
- [x] P0 ⑤ 세계관 통일
- [x] P1 ⑥ Operator 카드 (`OperatorFeed` — 랜딩 + 마켓플레이스)
- [x] P1 ⑦ `/story` (Navbar에 링크 추가)
- [x] P1 ⑧ Utopia/Dystopia 토글 (`PerspectiveToggle`)
- [x] P1 ⑨ VR 온보딩(`VRTour`) + 모바일 레이아웃
- [x] P2 ⑩ Contributors 실데이터화 (GitHub API, 서버 컴포넌트 + 1h revalidate)
- [x] P2 ⑪ 기여 진입로 (Footer 재작성 · 이슈 템플릿 2종 + config · `CONTRIBUTING.md`)
- [x] P2 ⑫ README 개편 (스크린샷 4장, 실행법, 톤 정렬)

### P2 구현 노트

- `/contributors`를 **서버 컴포넌트 + 클라이언트 UI**로 분리
  (`page.tsx` / `ContributorsClient.tsx` / `github.ts`).
  GitHub이 응답하지 않으면 **가짜 사람을 만들지 않고 `offline` 상태를 그대로 노출**한다.
  이 사이트에서 유일하게 진짜여야 하는 페이지이므로 의도된 실패 방식.
- 탭 3개(ledger/visionaries/terminal) → 2개(architects/commits)로 축소.
  장식용 노드 그리드는 제거 — `Math.random()`을 렌더 중 호출하던 lint 에러 5건도 함께 사라짐.
- Footer의 죽은 `#` 링크 13개를 전부 실제 목적지로 교체하거나 삭제.
- 이슈 템플릿: `roleplay-incident.yml`(2041년 사고 보고) / `screen-proposal.yml`(없는 화면 제안) /
  `config.yml`(Discussions·실제 버그 분기).
- 스크린샷은 `docs/screenshots/*.jpeg` (4장, 합계 828KB).

### 세션 종료 시점 lint 상태

| | errors | problems |
|---|---|---|
| 세션 시작 (`f3c84d4`) | 13 | 22 |
| P2 종료 | **5** | **11** |

남은 5건은 전부 기존 파일(`how-to`의 unescaped quotes / jsx 주석, `marketplace`·`layout`·
`DynamicMap`·`VRScene`의 미사용 import·`<img>` 경고).

### P1 구현 중 발견/처리

| 항목 | 내용 |
|---|---|
| Navbar 줄바꿈 | 링크가 7개가 되면서 1280px에서 줄바꿈 → 링크 패딩/폰트 축소, `flexShrink` 조정, `OPTIMAL 12ms` 리드아웃은 `xl` 이상에서만 표시 |
| VR FPV 카메라 | three의 fov는 수직 기준이라 세로 화면에서 수평 시야가 무너짐 → `VRScene`에서 aspect에 따라 fov 보정 (데스크톱 값은 불변) |
| BottomNav | `/vr`에서 비상정지 버튼을 가려서, 해당 경로에서는 렌더하지 않도록 변경 |
| 남은 것 (미처리) | `/vr` FPV 카메라가 로봇 자신의 바이저(emissive 평면)를 정면으로 보고 있어 화면 중앙이 청록색으로 채워짐. 데스크톱/모바일 공통의 **기존** 현상이며 씬 구성 변경이라 임의로 건드리지 않음 |
