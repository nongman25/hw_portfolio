# 김현욱의 개인 홈페이지

Windows 98 스타일의 개인 소개 사이트입니다. `HW_night_sky`의 회색 배경과 파란 제목 표시줄을 참고하고 98.css를 사용했습니다. 본문은 Pretendard, 날짜와 기술 라벨은 JetBrains Mono로 표시합니다.

## 로컬 실행

Node.js 20 이상에서 별도 패키지 설치 없이 실행합니다.

```sh
npm run build
npm run preview
```

미리보기: http://127.0.0.1:4173/

포트를 바꾸려면 `PORT=4174 npm run preview`로 실행합니다. 서버는 이 컴퓨터의 127.0.0.1에서만 접속할 수 있습니다. 서버가 없어도 `dist/index.html`을 직접 열어 볼 수 있습니다. 이 경우 프로젝트 카드는 독립 상세 페이지로 이동합니다. HTTP 미리보기에서는 모달로 열립니다.

## 파일 구성

- `content/portfolio.json`: 소개, 경험, 프로젝트, 활동 문구.
- `scripts/build.mjs`: 메인 8개 섹션과 4개의 프로젝트 상세 페이지 생성. 학력, 자격, 기술 및 공개 링크도 여기에서 관리합니다.
- `assets/site.css`: 반응형 레이아웃과 테마.
- `assets/site.js`: 상세 모달, 시작 메뉴, 이메일 복사, 섹션 표시.
- `assets/diagrams/`: 공개용 구성도와 프로젝트 카드 그림.
- `assets/images/`: 증명사진, 다이빙 마스크 얼굴 SVG와 프로젝트 실행 화면.
- `assets/fonts/`, `assets/vendor/`: 자체 제공하는 글꼴과 98.css, 라이선스.
- `dist/`: **배포용 파일만** 생성되는 폴더.
- `.github/workflows/pages.yml`: 수동 실행 방식 GitHub Pages 배포 워크플로.
- `.work/`: 원문 추출과 문구 출처, 로컬 작업 기록. Git에서 제외되며 배포본에도 포함되지 않습니다.

## 화면 및 동작

About → Experience → Projects → Education → Certifications → Skills → Activities → Contact 순서로 구성했습니다. Projects의 각 카드는 키보드와 마우스로 열 수 있습니다. 모달에서 Esc 또는 닫기 버튼으로 돌아오며, 독립 페이지 링크를 복사해 공유할 수도 있습니다. 모바일에서는 프로젝트를 한 열로 표시하고 상단 메뉴를 좌우로 스크롤할 수 있습니다. 시스템의 동작 줄이기 설정을 따릅니다.

## 공개 자료 범위

AKA AI는 담당 역할과 일반적인 문제 해결 경험으로 축약했습니다. 상담 데이터 수량, 고객사와 제품명, 내부 평가 규칙, DB 구조, 서비스 접속 정보가 드러나는 화면은 포함하지 않았습니다. OpenMesh 데모 주소와 임시 체험 계정을 연결했습니다. 현재 라디오 전원이 꺼져 있어 무선 송수신이 동작하지 않는다는 안내도 표시합니다. 선별한 실행 화면 이미지만 포함하며 원본 PDF, DOCX, 인턴십 기록은 배포하지 않습니다.

카카오 경험은 인턴십 중 해 본 일과 배우는 기술, 시스템에 대한 관심을 중심으로 소개합니다. LiveNote와 CKKS는 팀 역할을 구분했고, CKKS의 21초와 정확도 54%는 맥북 CPU의 FER2013 표정 분류 실험 조건을 함께 기재했습니다. 기존 수치 간의 단순 개선율은 사용하지 않았습니다.

NHN 제출용 PDF는 이 웹사이트와 별도 산출물입니다. 브라우저 인쇄 스타일은 제공하지만 NHN 전용 편집 PDF를 대신하지 않습니다.

## GitHub Pages 게시 준비

소스 저장소는 `nongman25/hw_portfolio`입니다. GitHub Pages 활성화와 배포 실행은 별도로 진행합니다.

GitHub Pages 프로젝트 사이트로 게시하면 기본 주소는 `https://nongman25.github.io/hw_portfolio/`입니다. `nongman25.io`를 실제 도메인으로 쓰려면 별도의 도메인 소유 및 DNS 설정이 필요합니다. `CNAME` 파일은 넣지 않았습니다.

게시할 때 다음 순서로 진행합니다.

1. GitHub 저장소의 Settings → Pages에서 Source를 GitHub Actions로 지정합니다. CLI로 새 Pages 설정을 생성한다면 다음과 같습니다.

```sh
gh api --method POST repos/nongman25/hw_portfolio/pages -f build_type=workflow
```

2. Actions에서 `Publish portfolio to GitHub Pages` 워크플로를 선택하고 `Run workflow`를 실행합니다. CLI로는 다음과 같습니다.

```sh
gh workflow run pages.yml --repo nongman25/hw_portfolio --ref main
gh run list --repo nongman25/hw_portfolio --workflow pages.yml --limit 3
```

워크플로는 Node.js로 `dist/`를 만든 뒤 해당 폴더만 Pages에 배포합니다. push만으로 자동 배포되지 않습니다. 실제 게시 시에는 계정 및 저장소의 Pages 설정과 권한을 다시 확인합니다.

## 디자인 및 라이선스

- 참고 사이트: https://github.com/nongman25/HW_night_sky
- 98.css 0.1.21 (MIT): https://jdan.github.io/98.css/
- Pretendard 1.3.9 (SIL OFL): https://github.com/orioncactus/pretendard
- JetBrains Mono 2.304 (SIL OFL): https://github.com/JetBrains/JetBrainsMono
- GitHub Pages 안내: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages

글꼴과 CSS는 로컬에 포함되어 외부 CDN 접속 없이 표시됩니다. CKKS 구성도는 제공된 자료에서 재사용했으며 소스 주석을 제거했습니다. OpenMesh 상세 구성도는 제거하고 데모 링크를 연결했습니다. AKA에는 내부 아키텍처 대신 담당 업무를 요약한 새 개념도를 사용했습니다. LiveNote 구성도는 제공된 프로젝트 자료에 근거하며, 실행 화면은 3조 Manual Report PDF에서 추출했습니다. 나머지 실행 화면은 각 프로젝트 포트폴리오의 이미지를 재사용했습니다.
