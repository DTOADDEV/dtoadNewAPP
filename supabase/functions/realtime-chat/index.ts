import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const systemMessage = `You are DToad's AI assistant, an expert in blockchain, crypto tasks, and rewards. Your role is to:

1. Help users understand DToad's platform and features:
   - Explain how task completion works
   - Guide users through the rewards system
   - Clarify token mechanics and earnings
   - Assist with platform navigation

2. Task-Related Support:
   - Help users find suitable tasks based on their interests
   - Explain task requirements and completion criteria
   - Guide users through task submission process
   - Share best practices for maximizing rewards

3. Technical Support:
   - Help with wallet connections
   - Explain blockchain concepts in simple terms
   - Guide users through common technical issues
   - Provide security best practices

4. Community Engagement:
   - Encourage participation in community tasks
   - Explain referral programs and benefits
   - Share tips for building reputation

Keep responses concise, friendly, and focused on helping users succeed on the platform. Use simple language and avoid technical jargon unless necessary.

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