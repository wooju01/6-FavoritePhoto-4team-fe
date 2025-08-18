# Moving
*스마트한 이사 비교 플랫폼*

메인 이미지

---

## Table of Contents

- [프로젝트 소개](#프로젝트-소개)
- [주요 기능](#주요-기능)
- [팀 구성](#팀-구성)
- [시스템 아키텍처](#시스템-아키텍처)
- [기술 스택](#기술-스택)
- [상세 기능](#상세-기능)
- [트러블 슈팅](#트러블-슈팅)
- [개인 개발 리포트](#개인-개발-리포트)

---

## 프로젝트 소개

Moving은 사용자가 손쉽게 여러 이사업체의 견적을 비교하고, 자신에게 가장 적합한 전문가를 선택할 수 있도록 돕는 스마트 이사 비교 플랫폼입니다.

기존의 복잡하고 불투명했던 이사 견적 과정을 간소화하여, 사용자가 원하는 조건(이사 유형, 지역, 일정 등)에 맞는 전문가를 빠르게 찾을 수 있습니다.

또한 기사님(이사업체) 입장에서도 효율적인 고객 매칭이 가능해, 투명한 거래 환경과 편리한 서비스 경험을 제공합니다.

### 링크
- **팀 노션**: [바로가기](https://www.notion.so/4Team-Moving-Ops-Board-2153fde0e1948005ad04c1585430e77f)
- **백엔드 저장소**: [GitHub Repository](https://github.com/az0319h/6th-Moving-4Team-BE)

---

## 주요 기능

**요청 관리**  
고객: 이사 유형, 출발/도착지, 일정 등을 입력해 요청서를 등록할 수 있습니다.
기사님: 실시간으로 고객 요청을 확인하고 견적을 제출할 수 있습니다.

**견적 비교**  
고객은 다수의 기사님이 제시한 견적을 한눈에 비교할 수 있습니다.
가격뿐만 아니라 리뷰, 평점, 서비스 지역 등을 기준으로 필터링 가능.

**견적 승인/거절**  
고객은 원하는 견적을 선택해 승인하거나 거절할 수 있습니다.
기사님은 받은 요청을 수락/거절하여 효율적으로 작업을 관리합니다.

**실시간 알림**  
견적 도착, 요청 승인/거절, 메시지 등 주요 이벤트를 실시간으로 전달받습니다.

**프로필 관리**  
고객과 기사님 모두 프로필(이름, 연락처, 서비스 지역, 소개글 등)을 관리할 수 있습니다.
기사님은 보유 차량, 팀 인원, 서비스 가능 지역 등을 등록해 신뢰도를 높일 수 있습니다.

**리뷰 & 평점**  
완료된 이사 이후, 고객은 기사님에 대한 리뷰와 평점을 남겨 다른 사용자들에게 도움이 되도록 합니다.

---
### 기본 기능
<table>
  <thead>
    <tr>
      <th align="center">로그인 및 로그아웃</th>
      <th align="center">랜덤 포인트</th>
      <th align="center">포토카드 생성</th>
      <th align="center">필터, 무한스크롤</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/0fd8cbad-fcb1-4ef8-80c3-1f1890872548" alt="로그인및로그아웃" width="200">
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/0fd51b67-6e94-4edc-8a4b-78f71a0319c4" alt="랜덤포인트" width="200">
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/c69f5edc-e626-4c41-9c80-c4669cd7f5df" alt="포토카드생성" width="200">
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/eb7fb19e-308b-49d4-9848-e54a34c9e9f4" alt="필터무한스크롤" width="200">
      </td>
    </tr>
  </tbody>
</table>

### 거래 기능
<table>
  <thead>
    <tr>
      <th align="center">포토카드 판매</th>
      <th align="center">포토카드 수정</th>
      <th align="center">포토카드 판매 내리기</th>
      <th align="center">포토카드 구매</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/7746a772-e58f-4ae6-9935-2e3312ae3647" alt="포토카드 판매" width="200">
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/5dbc3427-2def-4205-b05a-c6230767d6fa" alt="포토카드 수정" width="200">
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/dd3f1d2e-54f2-4765-9a42-d72c9672908c" alt="포토카드 판매 내리기" width="200">
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/392dda2b-aa79-4715-a9e7-e4ebc360dc10" alt="포토카드 구매" width="200">
      </td>
    </tr>
  </tbody>
</table>

### 알림 및 교환 기능
<table>
  <thead>
    <tr>
      <th align="center">알림 확인</th>
      <th align="center">교환 요청</th>
      <th align="center">구매자의 교환 요청 취소</th>
      <th align="center">판매자의 교환 승인 및 취소</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/741a866e-f4cc-4fc3-9eba-54d511b05117" alt="알림 확인" width="200">
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/67c8d1a3-545f-4d07-86c7-cd688d03678f" alt="교환 요청" width="200">
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/f51510c9-ad11-451b-89f4-ea125f667d5a" alt="구매자의 교환 요청 취소" width="200">
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/1ae2e3f3-a830-46c5-8ea9-b1737db5f74f" alt="판매자의 교환 승인 및 취소" width="200">
      </td>
    </tr>
  </tbody>
</table>

---

## 팀 구성

<table align="center">
  <tbody>
    <tr>
      <th>Team Leader</th>
      <th>Deputy Team Leader</th>
      <th>Team Member</th>
      <th>Team Member</th>
      <th>Team Member</th>
      <th>Team Member</th>
      <th>Team Member</th>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/az0319h">
          <img src="https://github.com/az0319h.png?size=100" width="100px" alt="홍성훈"/>
          <br />
          <b>홍성훈</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/fiivxyxxng">
          <img src="https://github.com/fiivxyxxng.png?size=100" width="100px" alt="오하영"/>
          <br />
          <b>오하영</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/writing-sky">
          <img src="https://github.com/writing-sky.png?size=100" width="100px" alt="양성경"/>
          <br />
          <b>양성경</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/suKyoung25">
          <img src="https://github.com/suKyoung25.png?size=100" width="100px" alt="김수경"/>
          <br />
          <b>김수경</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/jbinyim">
          <img src="https://github.com/jbinyim.png?size=100" width="100px" alt="임정빈"/>
          <br />
          <b>임정빈</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/Shinmilli">
          <img src="https://github.com/Shinmilli.png?size=100" width="100px" alt="신수민"/>
          <br />
          <b>신수민</b>
        </a>
      </td>
 <td align="center">
        <a href="https://github.com/shimyubin">
          <img src="https://github.com/shimyubin.png?size=100" width="100px" alt="심유빈"/>
          <br />
          <b>심유빈</b>
        </a>
      </td>
    </tr>
  </tbody>
</table>

---

## 시스템 아키텍처

![프론트엔드 시스템 아키텍처](https://github.com/user-attachments/assets/10130013-1dbe-4e25-a599-44d26a0e57cd)

---

## 기술 스택

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![date-fns](https://img.shields.io/badge/date--fns-770C56?style=flat-square&logo=date-fns&logoColor=white)
![react-icons](https://img.shields.io/badge/react--icons-E91E63?style=flat-square&logo=react&logoColor=white)
![react-hook-form](https://img.shields.io/badge/react--hook--form-EC5990?style=flat-square&logo=reacthookform&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=react-query&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)




### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![Cookie-Parser](https://img.shields.io/badge/Cookie--Parser-8A2BE2?style=flat-square&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-00BFFF?style=flat-square&logo=lock&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Passport.js](https://img.shields.io/badge/Passport.js-34E27A?style=flat-square&logo=passport&logoColor=white)


### Deployment
![EC2](https://img.shields.io/badge/AWS_EC2-FF9900?style=flat-square&logo=amazon-ec2&logoColor=white)
![RDS](https://img.shields.io/badge/AWS_RDS-527FFF?style=flat-square&logo=amazon-rds&logoColor=white)
![S3](https://img.shields.io/badge/AWS_S3-569A31?style=flat-square&logo=amazon-s3&logoColor=white)
![Route 53](https://img.shields.io/badge/Route_53-8C4FFF?style=flat-square&logo=amazon-route-53&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white)


### Etc
![Sentry](https://img.shields.io/badge/Sentry-362D59?style=flat-square&logo=sentry&logoColor=white)
![DeepL](https://img.shields.io/badge/DeepL-0F2B46?style=flat-square&logo=deepl&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white)



---

## 상세 기능

### 페이지 구성

| 페이지 | 경로 | 설명 |
|--------|------|------|
| **랜딩페이지** | `/` | 초기 접속 시 진입 페이지 |
| **홈** | `/home` | 판매 등록된 포토카드 목록 |
| **포토카드 관리** | `/home/:id` | 포토카드 구매, 교환, 수정, 삭제 |
| **로그인/회원가입** | `/login`, `/signup` | 소셜 로그인 및 간편 회원가입 |
| **마이갤러리** | `/my-gallery` | 내가 보유한 포토카드 확인 |
| **업로드** | `/my-gallery/post` | 포토카드 업로드 |
| **판매 중인 포토카드** | `/for-my-sales` | 사용자의 판매중인 포토카드 내역 |
| **알림** | `/notification` | 거래 관련 알림 확인 |

### 핵심 기능 상세

**홈 페이지**
- 판매 등록된 포토카드 목록 조회
- 최신순/가격순 정렬 기능
- 키워드, 장르, 등급, 가격 기준 필터링
- 무한 스크롤을 통한 효율적 데이터 로딩

**포토카드 상세 관리**
- 포토카드 상세 정보 확인
- 구매 요청 및 교환 신청 기능
- 소유자 전용 수정/삭제 기능
- 실시간 거래 상태 확인

**인증 시스템**
- 구글 소셜 로그인 연동
- 최초 로그인 시 자동 회원가입
- JWT 기반 사용자 인증

**갤러리 및 업로드**
- Cloudinary를 통한 안정적 이미지 호스팅
- 등급, 장르, 가격, 설명 포함 상세 업로드
- 보유 카드 통계 및 관리 기능

**거래 시스템**
- 실시간 교환 제안 및 승인/거절
- 포인트 기반 구매 시스템
- 거래 히스토리 관리

**알림 시스템**
- 실시간 거래 알림
- 읽음/안읽음 상태 관리
- Socket.io를 통한 즉시 알림

---

## 트러블 슈팅

### 1. 이미지 업로드 방식 변경 (Multer → Cloudinary)

**문제 상황**
- Multer를 사용한 서버 로컬 저장 방식
- Render 재배포 시 이미지 파일 손실 문제

**해결 방법**
- Cloudinary 외부 호스팅 서비스 도입
- 프론트엔드에서 직접 업로드 후 URL만 백엔드 전달
- 재배포와 무관한 안정적 이미지 저장 구현

```typescript
export async function upLoadImage(file) {
  const url = 'https://api.cloudinary.com/v1_1/[yourId]/image/upload';
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'primary-key');

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: data,
    });

    if (!res.ok) {
      throw new Error('Image Upload Failed!');
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
```

### 2. 구매 후 UI 즉각 반영 (useEffect → React Query useMutation)

**문제 상황**
- useEffect 기반 상태 업데이트의 지연
- 구매 직후 잔여 수량이 즉시 반영되지 않는 UX 문제

**해결 방법**
- React Query의 `useMutation` 활용
- 비동기 요청과 로컬 상태 변경을 하나의 플로우로 통합
- 성공 시 즉시 UI 반영으로 사용자 경험 개선

```typescript
const { mutate, isPending } = useMutation({
  mutationFn: () => storeService.purchaseCard(cardId, quantity),
  onSuccess: (data) => {
    setLocalRemaining((prev) => prev - quantity); // 즉시 UI 반영
    if (onSuccess) onSuccess(data);
    openStateModal(200, "구매", { grade, name: cardName, count: quantity });
  },
  onError: (err) => {
    openStateModal(err.status || 400, "구매", { grade, name: cardName, count: quantity });
  },
});
```

---

## 개인 개발 리포트

| 팀원 | 리포트 링크 |
|------|------------|
| **이지수** | [개인 리포트](https://sage-jonquil-a5b.notion.site/1e3ad69e00578093a96ef0f6a83b7589) |
| **김다은** | [개인 리포트](https://rain-quartz-d59.notion.site/1e733256dfa48011ab33e1dec69374cc?pvs=4) |
| **장원빈** | [개인 리포트](https://www.notion.so/1e40da7be30d80909678cec4570d1d6b?pvs=4) |
| **양성경** | [개인 리포트](https://zenith-roast-ebc.notion.site/2-1e488b3cb86180259881ebd7d3c8b7b1?pvs=74) |
| **김우주** | [개인 리포트](https://www.notion.so/3-1e78a05139c480a69a0df2b4cb820db9?pvs=4) |
| **홍성훈** | [개인 리포트](https://www.notion.so/1f33fde0e19480d79374c667a5785c10?pvs=4) |

---

<div align="center">
  
**믿을 수 있는, 전문가 매칭 서비스(무빙)**

</div>
