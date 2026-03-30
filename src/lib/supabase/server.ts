/**
 * @description Supabase 서버 클라이언트 (API 라우트/서버 컴포넌트용)
 * Service Role Key를 사용하여 RLS를 우회
 * 서버 사이드에서만 사용 (절대 클라이언트에 노출 금지)
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/** 서버용 Supabase 클라이언트 (service role key — RLS 우회) */
export function createServerClient() {
  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
