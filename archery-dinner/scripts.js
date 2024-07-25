document.addEventListener("DOMContentLoaded", () => {
  addRows();
});

function addRows() {
  const rowsContainer = document.getElementById("rowsContainer");

  for (let i = 1; i <= 3; i++) {
    const card = document.createElement("div");
    card.classList.add("col-md-6", "mb-3");

    card.innerHTML = `
            <div class="card">
                <div class="card-header">
                    End ${i}
                </div>
                <div class="card-body">
                    <div class="form-row mb-2 align-items-center">
                        <div class="col">
                            <select class="form-control" id="score${i}_1" onchange="calculateRowTotal(${i})">
                                <option value="">-- Select --</option>
                                ${createOptions()}
                            </select>
                        </div>
                        <div class="col">
                            <select class="form-control" id="score${i}_2" onchange="calculateRowTotal(${i})">
                                <option value="">-- Select --</option>
                                ${createOptions()}
                            </select>
                        </div>
                        <div class="col">
                            <select class="form-control" id="score${i}_3" onchange="calculateRowTotal(${i})">
                                <option value="">-- Select --</option>
                                ${createOptions()}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="card-footer text-muted">
                    <h5 id="totalScore${i}">Total: 0</h5>
                </div>
            </div>
        `;
    rowsContainer.appendChild(card);
  }
}

function createOptions() {
  let options = "";
  for (let value = 0; value <= 11; value++) {
    let displayValue = value;
    if (value === 0) displayValue = "MISS";
    if (value === 11) displayValue = "X";
    options += `<option value="${value}">${displayValue}</option>`;
  }
  return options;
}

function calculateRowTotal(row) {
  const score1 = parseInt(document.getElementById(`score${row}_1`).value) || 0;
  const score2 = parseInt(document.getElementById(`score${row}_2`).value) || 0;
  const score3 = parseInt(document.getElementById(`score${row}_3`).value) || 0;

  const total = score1 + score2 + score3;

  document.getElementById(`totalScore${row}`).textContent = `Total: ${total}`;
  calculateGrandTotal();
}

function calculateGrandTotal() {
  let grandTotal = 0;

  for (let i = 1; i <= 3; i++) {
    const rowTotal =
      parseInt(
        document.getElementById(`totalScore${i}`).textContent.split(": ")[1]
      ) || 0;
    grandTotal += rowTotal;
  }

  document.getElementById(
    "grandTotal"
  ).textContent = `Grand Total: ${grandTotal}`;
}

async function fetchRestaurants() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by this browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      const apiKey =
        "5u1vBzlUZtkYZgd-AGdYh17UWZiTW69u70bpFgnGUEwwhCLXjJV9qoveHkK6QKyryr81NwG4YtckIsnfA88qa7GZAov95IvyOaJnjvArumbCjlvp2eXr3UOPrP8kWXYx";
      const radius = 16090; // 1 mile in meters

      try {
        // Fetch restaurants with a minimum rating of 3.5
        const response = await fetch(
          `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&radius=${radius}&categories=restaurants&rating=3.5&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );

        const data = await response.json();
        let restaurants = data.businesses;

        // Filter out non-restaurant results if needed
        /*
        restaurants = restaurants.filter((business) => {
          return business.categories.some((cat) => cat.alias === "restaurants");
        });

        if (restaurants.length === 0) {
          alert("No restaurants found in your area.");
          return;
        }
          */

        // Randomly select 5 out of the filtered results
        const selectedRestaurants = getRandomSubset(restaurants, 5);

        // Sort the selected restaurants by rating in increasing order
        selectedRestaurants.sort((a, b) => a.rating - b.rating);

        displayRestaurantCard(selectedRestaurants);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        alert("Failed to fetch restaurants.");
      }
    },
    () => {
      alert("Unable to retrieve your location.");
    }
  );
}

function getRandomSubset(array, subsetSize) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, subsetSize);
}

function displayRestaurantCard(restaurants) {
  const grandTotalText = document
    .getElementById("grandTotal")
    .textContent.split(": ")[1];
  const grandTotal = parseInt(grandTotalText) || 0;

  // Calculate the maximum grand total possible (10 rows * 33 max value per row)
  const maxGrandTotal = 3 * (11 * 3);

  // Define non-overlapping ranges for each restaurant
  const ranges = generateNonOverlappingRanges(
    restaurants.length,
    maxGrandTotal
  );

  // Assign a random value within the assigned range to each restaurant
  const randomValues = restaurants.map((_, index) => {
    const [min, max] = ranges[index];
    return Math.floor(Math.random() * (max - min + 1)) + min;
  });

  // Append restaurants to the card
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("container", "mt-4");

  const cardHtml = `
        <div class="card">
            <div class="card-header">
                You Won a Dinner To...
            </div>
            <ul class="list-group list-group-flush">
                ${restaurants
                  .map(
                    (restaurant, index) => `
                    <li class="list-group-item" id="restaurant${index}">
                        <h5>${restaurant.name}</h5>
                        <p>${restaurant.location.address1}, ${restaurant.location.city}</p>
                        <p>Rating: ${restaurant.rating}</p>
                        <p>Range: ${ranges[index][0]} to ${ranges[index][1]}</p>
                    </li>
                `
                  )
                  .join("")}
            </ul>
        </div>
    `;

  cardContainer.innerHTML = cardHtml;
  document.querySelector("main").appendChild(cardContainer);

  highlightClosestResult(randomValues, grandTotal);
}

function generateNonOverlappingRanges(count, maxGrandTotal) {
  const ranges = [];
  const rangeSize = Math.floor(maxGrandTotal / count);

  for (let i = 0; i < count; i++) {
    const min = i * rangeSize + 1;
    const max = i === count - 1 ? maxGrandTotal : min + rangeSize - 1;
    ranges.push([min, max]);
  }

  return ranges;
}

function highlightClosestResult(randomValues, grandTotal) {
  // Find the closest value to the grand total
  let closestIndex = 0;
  let minDifference = Infinity;

  randomValues.forEach((value, index) => {
    const difference = Math.abs(value - grandTotal);
    if (difference < minDifference) {
      minDifference = difference;
      closestIndex = index;
    }
  });

  // Highlight the closest result
  document.getElementById(`restaurant${closestIndex}`).style.backgroundColor =
    "yellow";
}
