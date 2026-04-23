import { useStore } from "./store";
import { useState } from "react";
import { supabase } from "./supabaseClient";
import "./index.css";

export default function App() {
  const { name, setName, stage, goToQuestion, noClicks, clickNo, clickYes, reset } = useStore();
  const [input, setInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const handleContinue = async () => {
    if (!input.trim()) return;

    setSaving(true);
    setSaveError(null);

    const { error } = await supabase
      .from("neet_wishes")
      .insert([{ name: input.trim() }]);

    setSaving(false);

    if (error) {
      setSaveError("Couldn't save your name. Please try again.");
      console.error(error);
      return; // don't proceed if save failed
    }

    setName(input.trim());
    goToQuestion();
  };

  return (
    <div className="container">
      {stage === "input" && (
        <div className="card">
          <div className="title"> All the Best </div>

          <input
            className="input"
            placeholder="Enter your name..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleContinue()}
          />

          {saveError && (
            <div style={{ color: "red", fontSize: "13px", marginTop: "8px" }}>
              {saveError}
            </div>
          )}

          <br />

          <button
            className="button red"
            onClick={handleContinue}
            disabled={saving}
          >
            {saving ? "Saving..." : "Continue"}
          </button>
        </div>
      )}

      {stage === "question" && (
        <div className="card">
          <div className="question">
            {name}, do you trust yourself to be a doctor by passing NEET?
          </div>

          <div style={{ position: "relative", height: "150px" }}>
            <button
              onClick={clickYes}
              className={`button red ${noClicks === 0 ? "disabled" : ""}`}
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                padding: `${10 + noClicks * 5}px ${20 + noClicks * 8}px`,
                fontSize: `${14 + noClicks * 2}px`,
              }}
              disabled={noClicks === 0}
            >
              Yes 😄
            </button>

            <button
              onClick={clickNo}
              className="button white"
              style={{
                position: "absolute",
                transform: `translate(${Math.sin(noClicks) * 100}px, ${Math.cos(noClicks) * 60}px)`,
              }}
            >
              No 😢
            </button>
          </div>
        </div>
      )}

      {stage === "wishes" && (
        <div className="card">
          <div className="title"> All the Best, {name}! </div>

          <div className="wishes">
            {[
              "You've worked so hard 💪",
              "Believe in yourself ✨",
              "Stay calm and focused 🧠",
              "You will shine on 3rd May 2026 🌟",
              "Future doctor loading 👩‍⚕️",
              "I believe in you ",
              "You got this 💯",
            ].map((msg, i) => (
              <div key={i} className="wish-card">
                {msg}
              </div>
            ))}
          </div>

          <button className="button red" onClick={reset}>
            Reset 🔄
          </button>
        </div>
      )}
    </div>
  );
}