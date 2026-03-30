/**
 * @description Supabase 브라우저 클라이언트 (클라이언트 컴포넌트용)
 * 'use client' 컴포넌트에서 import하여 사용
 * 싱글톤 패턴으로 인스턴스 1개만 유지
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** 브라우저용 Supabase 클라이언트 (anon key 사용) */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
