import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Button, Input } from "../ui";
import { toast } from "sonner";
import * as syncService from "../../services/sync";
import { useNotesActions } from "../../context/NotesContext";

export function CloudSyncSettingsSection() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { refreshNotes } = useNotesActions();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
    });
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    
    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("Check your email for the confirmation link.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Successfully logged in.");
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully.");
  };

  const handleManualSync = async () => {
    setLoading(true);
    try {
      await syncService.pullNotes();
      await refreshNotes();
      toast.success("Notes synced from cloud.");
    } catch (error: any) {
      toast.error("Sync failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Supabase Cloud Sync</h2>
        <p className="text-sm text-text-muted">
          Sync your notes across devices using Supabase.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {user ? (
          <div className="flex flex-col gap-4 p-4 rounded-xl border border-border bg-bg-secondary/50">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">Logged in as</div>
                <div className="text-sm text-text-muted">{user.email}</div>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
            <div className="h-px w-full bg-border" />
            <div className="flex items-center justify-between">
              <div className="text-sm text-text-muted">
                Notes are synced automatically on save. You can also pull from the cloud manually.
              </div>
              <Button variant="primary" size="sm" onClick={handleManualSync} disabled={loading}>
                {loading ? "Syncing..." : "Manual Sync"}
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleAuth} className="flex flex-col gap-4 max-w-sm">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex items-center gap-2">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? "Loading..." : (isSignUp ? "Sign Up" : "Sign In")}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
