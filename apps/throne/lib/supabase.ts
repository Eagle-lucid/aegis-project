// cspell:disable
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions
export interface Treasury {
  id: number
  total: number
  marketing: number
  rd: number;
  infrastructure: number
  updated_at: string
}

// Treasury operations 
export const treasuryOps = {
  // Get current tresuary state
  async get() {
    const { data, error } = await supabase
      .from('treasury')
      .select('*')
      .eq('id', 1)
      .single()

      if (error) throw error
      return data as Treasury
  },

  // Excute budget optimization decree
  async optimizeBudget() {
    const current = await this.get()

    // Reallocate $5,000 from marketing to R&D
    const newMarketing = current.marketing - 5000;
    const newRD = current.rd + 5000;

    const { data, error } = await supabase
    .from('treasury')
    .update({
      marketing: newMarketing,
      rd: newRD,
      updated_at: new Date().toISOString(),
    })
    .eq('id', 1)
    .select()
    .single()

    if (error) throw error 
    return data as Treasury
  },
};