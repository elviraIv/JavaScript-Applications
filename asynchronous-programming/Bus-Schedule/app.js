function solve() {
  const departBtn = document.getElementById("depart");
  const arriveBtn = document.getElementById("arrive");
  const infoElement = document.querySelector("#info span");
  let stopId = {
    next: "depot",
  };

  async function depart() {
    departBtn.disabled = true;
    arriveBtn.disabled = false;

    const url = `http://localhost:3030/jsonstore/bus/schedule/${stopId.next}`;

    try {
      const res = await fetch(url);
      if (res.status !== 200) {
        throw new Error("Error");
      }
      stopId = await res.json();
      console.log(stopId);

      infoElement.textContent = `Next stop ${stopId.name}`;
    } catch (error) {
      throw new Error(error);
    }
  }

  function arrive() {
    departBtn.disabled = false;
    arriveBtn.disabled = true;

    infoElement.textContent = `Arriving at ${stopId.name}`;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
