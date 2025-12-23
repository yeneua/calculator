# Engineering Calculator Deployment Guide

## GitHub Pages 배포 설정

### 1. Repository 설정

1. GitHub Repository의 **Settings** → **Pages**로 이동
2. **Source**를 **GitHub Actions**로 설정
3. 저장

### 2. 자동 배포

`main` 브랜치에 push하면 자동으로 빌드 및 배포가 실행됩니다:

```bash
git add .
git commit -m "Deploy calculator"
git push origin main
```

### 3. 배포 확인

- GitHub Actions 탭에서 워크플로우 진행 상황 확인
- 배포 완료 후 `https://<username>.github.io/calculator/`에서 접속

### 4. 로컬 테스트

프로덕션 빌드를 로컬에서 테스트:

```bash
npm run build
npm run preview
```

### 5. 수동 배포 (선택사항)

GitHub Actions 대신 수동으로 배포하려면:

```bash
npm install -g gh-pages
npm run deploy
```

## 환경 변수

배포 시 사용되는 환경 변수:

- `VITE_APP_NAME`: 앱 이름
- `VITE_ENABLE_ANALYTICS`: 분석 활성화 여부

GitHub Actions에서 환경 변수를 추가하려면:
1. Repository Settings → Secrets and variables → Actions
2. New repository secret 클릭
3. 변수 추가

## 커스텀 도메인 (선택사항)

커스텀 도메인을 사용하려면:

1. `public/CNAME` 파일 생성:
   ```
   calculator.yourdomain.com
   ```

2. DNS 설정:
   - A 레코드: GitHub Pages IP 주소
   - 또는 CNAME 레코드: `<username>.github.io`

3. Repository Settings → Pages에서 커스텀 도메인 입력

## 트러블슈팅

### 404 오류
- `base` 설정이 올바른지 확인 (`vite.config.ts`)
- Repository 이름이 `calculator`인지 확인

### 빌드 실패
- `npm ci` 로컬에서 실행하여 의존성 확인
- `npm run test` 및 `npm run lint` 통과 확인

### 라우팅 문제
- `404.html` 파일이 `public` 폴더에 있는지 확인
- `main.tsx`에 리다이렉트 코드가 있는지 확인
