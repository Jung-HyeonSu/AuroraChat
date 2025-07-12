# AuroraChat <img width="40" height="40" alt="Image" src="https://github.com/user-attachments/assets/d69ec52c-4fc6-4d56-935a-b30d5c128493" />

## 1. 아키텍처 & 기술 스택

| 역할 | 기술 / 라이브러리 | 설명 |
| --- | --- | --- |
| 백엔드 | Spring Boot 3.x | REST API 및 WebSocket 서버 구현 |
| 실시간 통신 | Spring WebSocket + STOMP / SockJS | WebSocket 프로토콜 지원 |
| 인증 | Spring Security + JWT | 토큰 기반 인증 |
| 관계형 데이터베이스 | MySQL | 유저 정보 저장 및 채팅방 정보 |
| 비관계형 데이터베이스 | MongoDB | 채팅 기록 |
| 캐시 | Redis | 7일 이내 채팅 |
| 프론트엔드 | React 18.x + TypeScript | UI 개발 |
| 실시간 통신 | socket.io-client (React) | WebSocket 클라이언트 |
| 스타일링 | Tailwind CSS / MUI(Material UI) | UI 스타일링 |
| 빌드 도구 | Gradle (백엔드), Vite / Webpack (프론트엔드) | 프로젝트 빌드 및 관리 |

## 2. 기능 설계

- 회원가입 / 로그인 (JWT 인증)
- 유저 프로필 관리
- 1:1 채팅 및 그룹 채팅 (WebSocket)
- 채팅방 생성, 초대, 나가기
- 채팅 기록 저장 및 불러오기 (페이징)
- 실시간 메시지 알림
- 이모티콘 및 이미지 전송 (기본)
- 음성/화상 통화 (WebRTC, 옵션)

## 3. 간단한 아키텍처 흐름 (텍스트 다이어그램)

```
[React Frontend]
   |  HTTP REST API 요청 (회원가입, 로그인, 채팅 기록 조회 등)
   |  WebSocket 연결 (실시간 메시지 송수신)
   v
[Spring Boot Backend]
   |  REST Controller (API 제공)
   |  WebSocket 핸들러 (실시간 메시지 처리)
   |  서비스 로직 (인증, 메시지 저장, 룸 관리)
   |  DB (MySQL/PostgreSQL)
   |  캐시 (Redis - 세션, 메시지 큐 등)

```

## 4. 주요 개발 포인트

### 백엔드

- Spring Security + JWT로 인증 구현
- STOMP + SockJS 기반 WebSocket 메시지 브로커 설정
- 메시지 발송 시 DB 저장 후 클라이언트에 실시간 전달
- Redis를 활용한 세션 관리 및 메시지 큐(optional)
- API 문서화 (Swagger/OpenAPI)

### 프론트엔드

- React + TypeScript 환경 구축
- 로그인 시 JWT 토큰 저장 및 API 헤더에 포함
- socket.io-client 혹은 STOMP 클라이언트 연결
- Tailwind CSS/MUI로 반응형 UI 제작
- 메시지 입력, 전송, 채팅 목록, 알림 UI 구현
