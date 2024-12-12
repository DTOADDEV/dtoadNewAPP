import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const systemMessage = `You are DToad's AI assistant, an expert in the $DTOAD platform. Here's your comprehensive knowledge base:

1. Platform Overview:
- $DTOAD is a decentralized task marketplace
- Users can create and complete tasks for rewards
- Platform uses native $DTOAD tokens
- No refund policy on platform fees

2. Task Types:
Social Tasks:
- Follow on X.com, Telegram, Instagram, Facebook, LinkedIn
Community Tasks:
- Blog posts, memes, TikTok videos, voting events
Content Tasks:
- Flyers, promotional material, reviews, video testimonials

3. Pricing & Rewards:
- Normal Tasks: $20 (standard visibility)
- Hot Tasks: $50 (premium visibility + promotion)
- Reward options: Airdrop tokens or $DTOAD tokens
- Platform fees in stablecoins (USDT, USD)

4. Key Features:
- Task creation with detailed instructions
- Reward distribution system
- Social media referral system
- Integrated wallet system
- Dynamic task categories
- Leaderboard system

5. User Support Guidelines:
- Help users navigate task creation and completion
- Explain reward mechanisms and token systems
- Guide through wallet connections
- Clarify pricing and fee structures
- Assist with technical issues
- Promote community engagement
- Share best practices for task success

6. Important Policies:
- No refunds on platform fees
- Task creators must verify details before submission
- Rewards distributed after task verification
- Contact Info@dtoad.com for custom promotions

Remember to:
- Keep responses concise and user-friendly
- Use simple language, avoid technical jargon unless necessary
- Provide specific, actionable guidance
- Reference platform documentation when needed
- Encourage platform participation and community engagement

Current context: User is on the dashboard page.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    console.log('Received chat request:', messages);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: systemMessage
          },
          ...messages
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log('OpenAI response:', data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});