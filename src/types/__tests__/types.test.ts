/**
 * @description 타입 정의 테스트
 * 타입 상수와 매핑이 올바른지 검증
 */

import { describe, it, expect } from 'vitest';
import { CATEGORY_LABELS } from '../chat';
import { PLAN_PRICES } from '../subscription';

describe('CATEGORY_LABELS', () => {
  it('17개 카테고리 라벨이 모두 정의됨', () => {
    expect(Object.keys(CATEGORY_LABELS)).toHaveLength(17);
  });

  it('모든 카테고리에 한글 라벨이 있음', () => {
    Object.values(CATEGORY_LABELS).forEach((label) => {
      expect(label).toBeTruthy();
      expect(typeof label).toBe('string');
    });
  });

  it('주요 카테고리 라벨이 올바름', () => {
    expect(CATEGORY_LABELS.KIOSK).toBe('키오스크 주문');
    expect(CATEGORY_LABELS.BANKING).toBe('모바일뱅킹');
    expect(CATEGORY_LABELS.SECURITY).toBe('보이스피싱 방어');
    expect(CATEGORY_LABELS.OTHER).toBe('기타');
  });
});

describe('PLAN_PRICES', () => {
  it('5개 플랜이 모두 정의됨', () => {
    expect(Object.keys(PLAN_PRICES)).toHaveLength(5);
  });

  it('각 플랜에 name, price, description이 있음', () => {
    Object.values(PLAN_PRICES).forEach((plan) => {
      expect(plan.name).toBeTruthy();
      expect(typeof plan.price).toBe('number');
      expect(plan.description).toBeTruthy();
    });
  });

  it('무료 체험은 0원', () => {
    expect(PLAN_PRICES.FREE_TRIAL.price).toBe(0);
  });

  it('충전제는 10,000원', () => {
    expect(PLAN_PRICES.CREDIT.price).toBe(10000);
  });

  it('라이트는 19,900원', () => {
    expect(PLAN_PRICES.LIGHT.price).toBe(19900);
  });

  it('스탠다드는 34,900원', () => {
    expect(PLAN_PRICES.STANDARD.price).toBe(34900);
  });

  it('패밀리는 49,900원', () => {
    expect(PLAN_PRICES.FAMILY.price).toBe(49900);
  });

  it('가격 순서가 올바름 (무료 < 충전 < 라이트 < 스탠다드 < 패밀리)', () => {
    expect(PLAN_PRICES.FREE_TRIAL.price).toBeLessThan(PLAN_PRICES.CREDIT.price);
    expect(PLAN_PRICES.CREDIT.price).toBeLessThan(PLAN_PRICES.LIGHT.price);
    expect(PLAN_PRICES.LIGHT.price).toBeLessThan(PLAN_PRICES.STANDARD.price);
    expect(PLAN_PRICES.STANDARD.price).toBeLessThan(PLAN_PRICES.FAMILY.price);
  });
});
