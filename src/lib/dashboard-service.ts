import { createClient } from "@/lib/supabase/server";
import { Database } from "@/lib/database.types";
import { cache } from "react";

export type DashboardData = {
    profile: Database['public']['Tables']['profiles']['Row'] | null;
    assessment: Database['public']['Tables']['revenue_journey_assessments']['Row'] | null;
    isPro: boolean;
};

export const getDashboardData = cache(async (): Promise<DashboardData> => {
    const supabase = await createClient();

    // 1. Get User
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { profile: null, assessment: null, isPro: false };
    }

    // 2. Fetch Profile (Parallel)
    const profilePromise = supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    // 3. Fetch Latest Assessment (Parallel)
    const assessmentPromise = supabase
        .from('revenue_journey_assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    const [profileRes, assessmentRes] = await Promise.all([profilePromise, assessmentPromise]);

    // Handle missing profile by returning a mock "free" profile to avoid crashing
    const profile = profileRes.data || {
        id: user.id,
        email: user.email || "",
        full_name: user.user_metadata?.full_name || "Revenue Architect",
        subscription_tier: "free",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    } as Database['public']['Tables']['profiles']['Row'];

    const assessment = assessmentRes.data;
    const isPro = profile.subscription_tier !== 'free';

    return {
        profile,
        assessment,
        isPro
    };
});
