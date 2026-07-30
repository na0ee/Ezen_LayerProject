# LAYER 기술 개요

## 1. 프로젝트 소개

LAYER는 취향 기반 향수 추천, 향수 검색·상세 정보, 위시리스트, 커뮤니티, 매거진, 래플 기능을 제공하는 모바일 중심 웹 애플리케이션이다.

현재 프로젝트는 별도 백엔드 없이 프런트엔드의 정적 데이터와 브라우저 저장소를 사용하는 프로토타입 형태다.

## 2. 기술 스택

| 구분      | 기술                            |
| --------- | ------------------------------- |
| UI        | React 19                        |
| 빌드 도구 | Vite 8                          |
| 라우팅    | React Router 7                  |
| 스타일    | Tailwind CSS 4, CSS             |
| 언어      | JavaScript, 일부 TypeScript/TSX |
| 코드 검사 | Oxlint                          |
| 배포 설정 | Vercel                          |

## 3. 실행 방법

Node.js와 npm이 설치된 환경에서 실행한다.

```bash
npm install
npm run dev
```

주요 명령어:

```bash
npm run dev      # 개발 서버
npm run build    # 배포용 빌드
npm run preview  # 빌드 결과 확인
npm run lint     # 코드 검사
```

## 4. 프로젝트 구조

```text
src/
├── assets/       # 이미지, 아이콘, 영상
├── components/   # 공통 UI 컴포넌트
├── data/         # 향수·사용자·리뷰 등 정적 데이터와 저장 로직
├── hooks/        # 공통 React 훅
├── pages/        # 화면 단위 컴포넌트
├── App.jsx       # 전체 라우트 및 공통 동작
├── main.jsx      # 앱 진입점
└── index.css     # 디자인 토큰과 전역 스타일

Magazine/         # 매거진 화면과 전용 리소스
public/           # PWA 아이콘 및 정적 공개 파일
```

## 5. 주요 기능

- 로그인 및 프로필 설정
- 취향 설문과 향수 추천 결과
- 향수 검색, 상세 조회, 위시리스트
- 보유 향수 및 사용 기록 관리
- 커뮤니티 게시글, 추천, 리뷰, 챌린지
- 향수 매거진과 래플
- 향수 추천 챗봇 UI

화면 이동은 `src/App.jsx`의 `BrowserRouter` 기반 라우트에서 관리한다. 주요 경로는 `/home`, `/community`, `/magazine`, `/my`, `/perfume/:id`이다.

## 6. 데이터 관리

향수와 콘텐츠 데이터는 주로 `src/data/`의 로컬 파일에서 제공한다. 사용자 설정, 위시리스트, 포인트, 향수 기록, 커뮤니티 게시글 등은 `localStorage`에 저장하며, 일부 화면 간 임시 데이터는 `sessionStorage`를 사용한다.

따라서 브라우저 데이터 삭제 시 사용자가 만든 데이터가 초기화되며, 여러 기기 간 동기화나 실제 사용자 인증은 지원하지 않는다.

## 7. UI 규칙과 배포

색상·폰트 등의 디자인 토큰은 `src/index.css`에 정의되어 있다. 공통 컴포넌트 작성 규칙은 루트의 `COMPONENTS.md`를 따른다. 화면은 모바일 너비를 중심으로 설계되며 데스크톱에서는 `DesktopFrame`이 앱 영역을 감싼다.

Vercel 배포 시 `vercel.json`의 rewrite 설정으로 모든 경로를 `index.html`에 연결하여 SPA 새로고침을 지원한다.

## 8. 현재 제약 사항

- 백엔드 API와 데이터베이스가 없다.
- 로그인은 실제 인증 시스템과 연결되어 있지 않다.
- 자동화 테스트가 구성되어 있지 않다.
- JavaScript와 TypeScript가 혼용되어 있다.
- 운영 서비스 전환 시 API, 인증, 서버 저장소, 오류 처리 및 테스트 추가가 필요하다.
