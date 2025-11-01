import { useEffect, useState } from "react";

export default function Popup() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    chrome.storage.sync.get(["enabled"], (res) => setEnabled(res.enabled ?? true));
  }, []);

  const toggle = () => {
    chrome.storage.sync.set({ enabled: !enabled });
    setEnabled(!enabled);
    chrome.runtime.sendMessage({ type: "TOGGLE_ENABLED", payload: !enabled });
  };

  return (
    <div className="p-3">
      <h1>Cats on Ads 🐈</h1>
      <button onClick={toggle}>{enabled ? "Disable" : "Enable"}</button>
    </div>
  );
}