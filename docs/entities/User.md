# 엔티티: User

## 정의
서비스를 사용하는 모든 사람 — 시니어, 가족(자녀), 상담원, 관리자

## 필드

| 필드명 | 타입 | 필수 여부 | 설명 |
|--------|------|-----------|------|
| id | uuid | 필수 | 고유 식별자 (Supabase Auth uid) |
| email | string | 선택 | 이메일 (가족/상담원 로그인용) |
| name | string | 필수 | 이름 |
| phone | string | 선택 | 전화번호 |
| role | enum | 필수 | SENIOR / FAMILY / AGENT / ADMIN |
| kakaoId | string | 선택 | 카카오톡 연동 ID (시니어) |
| avatarUrl | string | 선택 | 프로필 이미지 |
| createdAt | datetime | 필수 | 가입일 |
| updatedAt | datetime | 필수 | 최종 수정일 |

## 비즈니스 규칙
- 시니어는 카카오톡 채널 추가만으로 자동 생성 (별도 회원가입 불필요)
- 가족은 카카오 소셜 로그인으로 가입
- 상담원/관리자는 관리자가 직접 계정 생성
- email은 가족/상담원/관리자에게만 필수

## 코드 위치
- DB 스키마: Supabase `users` 테이블
- 타입 정의: `src/types/user.ts`

## 관련 유스케이스
- 로그인 (usecases/login.md)
- 회원가입 (usecases/register.md)
