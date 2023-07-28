async function getInfo() {
  const stopIdElement = document.getElementById("stopId");
  const busId = stopIdElement.value;
  const stopNameElement = document.getElementById("stopName");
  const ulElement = document.getElementById("buses");

  const url = `http://localhost:3030/jsonstore/bus/businfo/${busId}`;

  try {
    stopNameElement.textContent = "Loading...";
    ulElement.replaceChildren();

    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error("Bus station ID not found ");
    }

    const data = await response.json();

    stopNameElement.textContent = data.name;

    Object.entries(data.buses).forEach((b) => {
      const liElement = document.createElement("li");
      liElement.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
      ulElement.appendChild(liElement);
    });
  } catch (error) {
    stopNameElement.textContent = "Error";
  }
}
