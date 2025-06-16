
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    phone: "", 
    location: "",
    userType: "student" 
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: signupForm.email,
        password: signupForm.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            name: signupForm.name,
            phone: signupForm.phone,
            location: signupForm.location,
            is_owner: signupForm.userType === "service_provider"
          }
        }
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Sign up successful! Please check your email to confirm your account.");
      }
    } catch (error) {
      toast.error("An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (userType: 'student' | 'service_provider') => {
    setIsLoading(true);
    const credentials = userType === 'student' 
      ? { email: "student@gmail.com", password: "12345678" }
      : { email: "service@gmail.com", password: "12345678" };

    try {
      const { error } = await supabase.auth.signInWithPassword(credentials);

      if (error) {
        toast.error(`${userType} account not found. Creating account...`);
        
        // Create the account if it doesn't exist
        const { error: signupError } = await supabase.auth.signUp({
          email: credentials.email,
          password: credentials.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              name: userType === 'student' ? "Test Student" : "Test Service Provider",
              phone: userType === 'student' ? "9876543210" : "8765432109",
              location: "Delhi, India",
              is_owner: userType === "service_provider"
            }
          }
        });

        if (signupError) {
          toast.error(signupError.message);
        } else {
          toast.success(`${userType} account created! Please check email to confirm.`);
        }
      } else {
        toast.success(`Login successful as ${userType}!`);
        navigate("/");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">StudentHub</h1>
          <p className="text-gray-600">Your campus services marketplace</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Sign in to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              <Button 
                onClick={() => handleQuickLogin('student')} 
                className="w-full" 
                variant="outline"
                disabled={isLoading}
              >
                Quick Login as Student
                <span className="text-xs ml-2">(student@gmail.com)</span>
              </Button>
              <Button 
                onClick={() => handleQuickLogin('service_provider')} 
                className="w-full" 
                variant="outline"
                disabled={isLoading}
              >
                Quick Login as Service Provider
                <span className="text-xs ml-2">(service@gmail.com)</span>
              </Button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      value={signupForm.name}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone</Label>
                    <Input
                      id="signup-phone"
                      value={signupForm.phone}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-location">Location</Label>
                    <Input
                      id="signup-location"
                      value={signupForm.location}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>I am a:</Label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="student"
                          checked={signupForm.userType === "student"}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, userType: e.target.value }))}
                          className="mr-2"
                        />
                        Student
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="service_provider"
                          checked={signupForm.userType === "service_provider"}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, userType: e.target.value }))}
                          className="mr-2"
                        />
                        Service Provider
                      </label>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
