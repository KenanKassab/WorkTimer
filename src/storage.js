export function saveSession(seconds) {
    const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  
    const stored = JSON.parse(localStorage.getItem("sessions") || "{}");
  
    if (!stored[today]) {
      stored[today] = [];
    }
  
    stored[today].push({
      duration: seconds,
      timestamp: Date.now()
    });
  
    localStorage.setItem("sessions", JSON.stringify(stored));
  }
  
  export function getSessions() {
    return JSON.parse(localStorage.getItem("sessions") || "{}");
  }
  
  export function getWeeklyTotals() {
    const stored = JSON.parse(localStorage.getItem("sessions") || "{}");
    const today = new Date();
    const oneDayMs = 24 * 60 * 60 * 1000;
  
    const weekData = [];
  
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today.getTime() - i * oneDayMs);
      const key = d.toISOString().slice(0, 10);
      const daySessions = stored[key] || [];
      const totalSeconds = daySessions.reduce((sum, s) => sum + s.duration, 0);
  
      weekData.push({
        date: key,
        totalMinutes: Math.round(totalSeconds / 60)
      });
    }
  
    return weekData;
  }
  