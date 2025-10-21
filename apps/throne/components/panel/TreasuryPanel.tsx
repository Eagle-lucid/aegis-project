// cspell:disable
//apps/throne/components/panels/TreasuryPanel.tsx
'use client'; 

import { useEffect, useState } from 'react';
import { GlassPanel } from "@/components/ui/GlassPanel";
import { BudgetBar } from "@/components/ui/BudgetBar";
import { supabase, Treasury } from '@/lib/supabase';

export function TreasuryPanel() {
    const [treasury, setTreasury] = useState<Treasury | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch intial data
    useEffect(() => {
      fetchTresury()
    }, []);

    // Subscribe to real-time updates
    useEffect(() => {
      console.log('🔔 Setting up real-time subscription...')
      const channel = supabase
      .channel('treasury-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'treasury',
          filter: 'id=eq.1',
        },
        (payload) => {
          console.log('🔔 Setting up real-time subscription...')
          setTreasury(payload.new as Treasury)
        }
      )
      .subscribe((status) => {
        console.log('📡 Subscription status:', status)
      })

      return () => {
        console.log('🔌 Cleaning up subscription...')
        supabase.removeChannel(channel)
      }
    }, []);

    const fetchTresury = async (retries = 3): Promise<void> => {
        try {
            const { data, error } = await supabase
            .from('treasury')
            .select('*')
            .eq('id', 1)
            .single()

            if (error) throw error
            setTreasury(data)
        } catch (error) {
            console.error('Error fetching treasury:', error)

            if (retries > 0) {
              console.log(`Network error. Retrying... (${retries} attempt left)`)
              await new Promise(resolve => setTimeout(resolve, 2000))
              return fetchTresury(retries -1)
            } else {
              // All retries failed
              console.error('Failed to load treasury after 3 attempts')
            }
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <GlassPanel className="border-throne-emerald-500/30">
              <div className="text-center py-12">
                <div className="animate-spin text-4xl mb-2">💰</div>
                <p className="text-gray-400">Loading treasury...</p>
              </div>
            </GlassPanel>
        )
    }

    if (!treasury) {
        return (
            <GlassPanel className="border-throne-emerald-500/30">
              <p className="text-red-400">Failed to load treasury data</p>
            </GlassPanel>
        )
    }

    // Calculate percentages 
    const marketingPct = Math.round((treasury.marketing / treasury.total) * 100);
    const rdPct = Math.round((treasury.rd / treasury.total) * 100);
    const infraPct = Math.round((treasury.infrastructure / treasury.total) * 100)
    

    return (
        <GlassPanel className="border-throne-emerald-500/30">
            {/* Header */}
            <div className="mb-6">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-throne-emerald-400 mb-2">
                  Treasury Health
              </h2>
              <p className="font-[family-name:var(--font-inter)] text-gray-500 text-sm">
                  Resource allocation and financial overview
              </p>
            </div>
            
            {/* Total Treasury Display */}
            <div className="mb-8 text-center p-6 bg-throne-bg-secondary rounded-lg border border-throne-emerald-500/20">
                <p className="text-sm text-gray-400 mb-2 font-medium">Total Treasury</p>
                <p className="text-5xl font-[family-name:var(--font-display)] font-bold text-white mb-2">
                    ${treasury.total.toLocaleString()}
                </p>
                <p className="font-[family-name:var(--font-inter)] text-xs text-throne-emerald-400">
                    💰 Fully capitalized
                </p>
            </div>

            {/* Budget Allocation Bars */}
            <div className="space-y-6">
                <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Budget Allocation
                </h3>

                <BudgetBar
                  label='Marketing'
                  amount={treasury.marketing}
                  percentage={marketingPct}
                  color='amber'
                />

                <BudgetBar
                  label='R&D'
                  amount={treasury.rd}
                  percentage={rdPct}
                  color='cyan'
                />

                <BudgetBar
                  label='Infrastructure'
                  amount={treasury.infrastructure}
                  percentage={infraPct}
                  color='emerald'
                />
            </div>
        </GlassPanel>
    );
};