function getSensorData() {
  const resultDiv = document.getElementById("result");
  const loading = document.getElementById("loading");
  const button = document.getElementById("fetchBtn");

  resultDiv.textContent = "";
  loading.classList.remove("hidden");
  button.disabled = true;

  fetch("http://192.168.1.100/data") // 🔁 Replace with your Arduino IP and endpoint
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.text();
    })
    .then((data) => {
      resultDiv.textContent = `✅ Sensor says: ${data}`;
    })
    .catch((err) => {
      console.error(err);
      resultDiv.textContent = "❌ Error contacting Arduino.";
    })
    .finally(() => {
      loading.classList.add("hidden");
      button.disabled = false;
    });
}
