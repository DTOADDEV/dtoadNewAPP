import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log("User already logged in, redirecting to home");
        navigate("/");
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session ? "logged in" : "logged out");
        
        if (event === 'SIGNED_IN') {
          console.log("User signed in successfully");
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in.",
          });
          navigate("/");
        } else if (event === 'SIGNED_OUT') {
          console.log("User signed out");
        } else if (event === 'PASSWORD_RECOVERY') {
          console.log("Password recovery initiated");
          toast({
            title: "Password Recovery",
            description: "Please check your email for password reset instructions.",
          });
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dtoad-background via-dtoad-background-light to-dtoad-background-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-dtoad-background-light/80 backdrop-blur-lg p-8 rounded-lg border border-dtoad-primary/20 shadow-xl">
          <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-dtoad-primary to-dtoad-accent bg-clip-text text-transparent">
            Welcome to DToad
          </h2>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#10B981',
                    brandAccent: '#064E3B',
                  },
                },
              },
              className: {
                message: 'text-red-600',
                button: 'bg-dtoad-primary hover:bg-dtoad-primary/90',
              },
            }}
            providers={[]}
            view="sign_in"
            showLinks={true}
            redirectTo={window.location.origin}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;